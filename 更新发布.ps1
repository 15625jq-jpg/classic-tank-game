param(
  [string]$Version,
  [string]$ReleaseDate,
  [string[]]$Bullets,
  [string]$ProjectRoot,
  [string]$PublishRoot
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Normalize-Version {
  param([string]$InputVersion)
  $value = ($InputVersion ?? "").Trim()
  if (-not $value) {
    throw "版本号不能为空。"
  }
  if ($value -notmatch '^[vV]') {
    $value = "v$value"
  } else {
    $value = "v" + $value.Substring(1)
  }
  if ($value -notmatch '^v\d+(?:\.\d+)+$') {
    throw "版本号格式无效：$value。请使用类似 v3.9 或 v4.0 的格式。"
  }
  return $value
}

function Get-RequiredContent {
  param(
    [string]$Path,
    [string]$Description
  )
  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Description 不存在：$Path"
  }
  return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Set-FileContent {
  param(
    [string]$Path,
    [string]$Content
  )
  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
}

function Require-Replace {
  param(
    [string]$Content,
    [string]$Pattern,
    [scriptblock]$Evaluator,
    [string]$Description
  )
  $regex = [regex]::new($Pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $regex.IsMatch($Content)) {
    throw "未找到需要更新的内容：$Description"
  }
  return $regex.Replace($Content, $Evaluator, 1)
}

function Get-MarkerBlock {
  param(
    [string]$Content,
    [string]$StartMarker,
    [string]$EndMarker
  )
  $pattern = "(?s)(<!-- $([regex]::Escape($StartMarker)) -->)(.*?)(<!-- $([regex]::Escape($EndMarker)) -->)"
  $match = [regex]::Match($Content, $pattern)
  if (-not $match.Success) {
    throw "未找到标记区块：$StartMarker / $EndMarker"
  }
  return @{
    FullMatch = $match.Value
    StartTag = $match.Groups[1].Value
    Body = $match.Groups[2].Value
    EndTag = $match.Groups[3].Value
  }
}

function Set-MarkerBlock {
  param(
    [string]$Content,
    [string]$StartMarker,
    [string]$EndMarker,
    [string]$NewBody
  )
  $pattern = "(?s)(<!-- $([regex]::Escape($StartMarker)) -->)(.*?)(<!-- $([regex]::Escape($EndMarker)) -->)"
  $regex = [regex]::new($pattern)
  if (-not $regex.IsMatch($Content)) {
    throw "未找到标记区块：$StartMarker / $EndMarker"
  }
  return $regex.Replace($Content, "`$1`r`n$NewBody`r`n`$3", 1)
}

function Get-CurrentVersionFromPlay {
  param([string]$Content)
  $match = [regex]::Match($Content, '经典坦克大战平衡版( v?\d+(?:\.\d+)+)?|经典坦克大战平衡版(v\d+(?:\.\d+)+)\.html')
  $hrefMatch = [regex]::Match($Content, '经典坦克大战平衡版(v\d+(?:\.\d+)+)\.html')
  if (-not $hrefMatch.Success) {
    throw "无法从 play/index.html 识别当前正式版本。"
  }
  return $hrefMatch.Groups[1].Value
}

function Prompt-ForValue {
  param(
    [string]$Label,
    [string]$Default = ""
  )
  if ($Default) {
    $value = Read-Host "$Label [$Default]"
    if ([string]::IsNullOrWhiteSpace($value)) {
      return $Default
    }
    return $value.Trim()
  }
  while ($true) {
    $value = (Read-Host $Label).Trim()
    if ($value) {
      return $value
    }
    Write-Host "请输入有效内容。" -ForegroundColor Yellow
  }
}

function Prompt-ForBullets {
  param([string[]]$ExistingBullets)
  if ($ExistingBullets -and $ExistingBullets.Count -gt 0) {
    return $ExistingBullets
  }
  $items = New-Object System.Collections.Generic.List[string]
  $index = 1
  Write-Host "请逐条输入更新摘要，直接回车结束。" -ForegroundColor Cyan
  while ($true) {
    $text = (Read-Host "更新第 $index 条").Trim()
    if (-not $text) {
      if ($items.Count -gt 0) {
        break
      }
      Write-Host "至少需要输入 1 条更新摘要。" -ForegroundColor Yellow
      continue
    }
    $items.Add($text)
    $index++
  }
  return $items.ToArray()
}

function Build-ListItems {
  param([string[]]$Items)
  return (($Items | ForEach-Object { "        <li>$($_)</li>" }) -join "`r`n")
}

function Build-HomeCurrentReleaseBlock {
  param(
    [string]$VersionValue,
    [string]$DateValue,
    [string[]]$Items
  )
  $listItems = (($Items | ForEach-Object { "              <li>$($_)</li>" }) -join "`r`n")
  return @"
          <article class="timeline-item">
            <header>
              <h3>$VersionValue</h3>
              <span>$DateValue</span>
            </header>
            <ul>
$listItems
            </ul>
          </article>
"@
}

function Build-HomeHistoryBlock {
  param(
    [string]$CurrentVersion,
    [string]$PreviousVersion
  )
  return @"
          <article class="panel">
            <h3>当前正式版本</h3>
            <p>$CurrentVersion 作为默认游玩入口，面向当前对外发布。</p>
            <p><a href="./经典坦克大战平衡版$CurrentVersion.html" style="color:#f4c84a;">打开 $CurrentVersion</a></p>
          </article>
          <article class="panel">
            <h3>历史版本</h3>
            <p>$PreviousVersion 作为上一正式版本保留，适合回看此前一轮平衡和表现。</p>
            <p><a href="./经典坦克大战平衡版$PreviousVersion.html" style="color:#f4c84a;">打开 $PreviousVersion</a></p>
          </article>
"@
}

function Build-UpdateEntry {
  param(
    [string]$VersionValue,
    [string]$DateValue,
    [string[]]$Items
  )
  $listItems = Build-ListItems -Items $Items
  return @"
    <article class="entry">
      <header>
        <h2>$VersionValue</h2>
        <span>$DateValue</span>
      </header>
      <ul>
$listItems
      </ul>
    </article>
"@
}

function Build-VersionEntry {
  param(
    [string]$VersionValue,
    [bool]$IsCurrent,
    [string]$Summary
  )
  $meta = if ($IsCurrent) { "当前正式版本" } else { "历史版本" }
  $buttonClass = if ($IsCurrent) { "button primary" } else { "button secondary" }
  $summaryText = if ($Summary) { $Summary } elseif ($IsCurrent) { "当前默认游玩入口，已纳入 $VersionValue 的最新调整。" } else { "保留为可查找历史版本，适合回看该版本阶段的平衡与表现。" }
  return @"
    <article class="entry">
      <header>
        <h2>$VersionValue</h2>
        <span class="meta">$meta</span>
      </header>
      <p>$summaryText</p>
      <div class="actions">
        <a class="$buttonClass" href="../经典坦克大战平衡版$VersionValue.html">打开 $VersionValue</a>
      </div>
    </article>
"@
}

function Normalize-PlainLines {
  param([string[]]$Lines)
  return @(
    $Lines |
      ForEach-Object { ($_ ?? "") -replace '^\s*#+\s*', '' } |
      ForEach-Object { $_.TrimEnd() } |
      Where-Object { $_.Trim() -ne "" }
  )
}

function Build-DirectoryTreeLines {
  param(
    [string]$RootPath,
    [string]$RelativePath = "",
    [int]$Depth = 0
  )
  $targetPath = if ($RelativePath) { Join-Path $RootPath $RelativePath } else { $RootPath }
  $entries = Get-ChildItem -LiteralPath $targetPath -Force | Sort-Object @{ Expression = { -not $_.PSIsContainer } }, Name
  $lines = New-Object System.Collections.Generic.List[string]
  foreach ($entry in $entries) {
    $indent = ("  " * $Depth)
    $label = $indent + $entry.Name + $(if ($entry.PSIsContainer) { "/" } else { "" })
    $lines.Add($label)
    if ($entry.PSIsContainer) {
      $childRelative = if ($RelativePath) { Join-Path $RelativePath $entry.Name } else { $entry.Name }
      foreach ($childLine in (Build-DirectoryTreeLines -RootPath $RootPath -RelativePath $childRelative -Depth ($Depth + 1))) {
        $lines.Add($childLine)
      }
    }
  }
  return $lines.ToArray()
}

function Build-ReadmeContent {
  param([string]$RootPath)
  $versionFiles = Get-ChildItem -LiteralPath $RootPath -Filter '经典坦克大战平衡版v*.html' -File |
    Sort-Object Name -Descending |
    ForEach-Object { '- ``' + $_.Name + '``' }
  $treeLines = Build-DirectoryTreeLines -RootPath $RootPath
  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add("# 经典坦克大战平衡版")
  $lines.Add("")
  $lines.Add("正式发布目录，包含首页、游玩入口、版本更新页与历史版本入口。")
  $lines.Add("")
  $lines.Add("## 结构说明")
  $lines.Add("")
  $lines.Add('- `index.html`：正式首页，展示当前版本、更新入口和历史版本入口。')
  $lines.Add('- `play/`：正式游玩入口目录，`play/index.html` 默认跳转到当前正式版本。')
  $lines.Add('- `updates/`：版本更新页目录，展示近期更新摘要。')
  $lines.Add('- `versions/`：历史版本页目录，展示仍可访问的旧版本入口。')
  $lines.Add('- `records/`：完整记录页目录，负责以更适合阅读的样式展示版本说明。')
  $lines.Add('- `更新发布.ps1`：本地自动更新脚本。')
  $lines.Add('- `经典坦克大战平衡版版本调整说明.md`：完整版本调整记录。')
  $lines.Add("")
  $lines.Add("## 当前版本文件")
  $lines.Add("")
  if ($versionFiles.Count -gt 0) {
    foreach ($line in $versionFiles) {
      $lines.Add($line)
    }
  } else {
    $lines.Add("- 暂无版本文件")
  }
  $lines.Add("")
  $lines.Add("## 目录树")
  $lines.Add("")
  $lines.Add('```text')
  foreach ($line in $treeLines) {
    $lines.Add($line)
  }
  $lines.Add('```')
  return ($lines -join [Environment]::NewLine)
}

function Get-NotesHeaderAndBody {
  param([string]$Content)
  $lines = ($Content -replace "`r", "") -split "`n"
  $nonEmptyIndexes = @()
  for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i].Trim()) {
      $nonEmptyIndexes += $i
    }
  }

  $title = "经典坦克大战平衡版版本调整说明"
  $intro = "本文档用于记录各版本相对前一版本的主要调整内容、影响范围和验证情况，便于后续持续迭代。"
  if ($nonEmptyIndexes.Count -ge 1) {
    $title = ($lines[$nonEmptyIndexes[0]].Trim()) -replace '^#+\s*', ''
  }
  if ($nonEmptyIndexes.Count -ge 2) {
    $intro = ($lines[$nonEmptyIndexes[1]].Trim()) -replace '^#+\s*', ''
  }

  $bodyStart = if ($nonEmptyIndexes.Count -ge 2) { $nonEmptyIndexes[1] + 1 } elseif ($nonEmptyIndexes.Count -ge 1) { $nonEmptyIndexes[0] + 1 } else { 0 }
  $body = ""
  if ($bodyStart -lt $lines.Length) {
    $body = ($lines[$bodyStart..($lines.Length - 1)] -join "`r`n").Trim()
  }

  return @{
    Title = $title
    Intro = $intro
    Body = $body
  }
}

function Build-ReleaseNotesMarkdown {
  param(
    [string]$Title,
    [string]$Intro,
    [string]$VersionValue,
    [string]$DateValue,
    [string]$PreviousVersion,
    [string[]]$Items,
    [string]$ExistingBody
  )

  $contentLines = New-Object System.Collections.Generic.List[string]
  $contentLines.Add('# ' + $Title)
  $contentLines.Add('')
  $contentLines.Add($Intro)
  $contentLines.Add('')
  $contentLines.Add('## ' + $VersionValue + ' 调整内容')
  $contentLines.Add('')
  $contentLines.Add('- 发布日期：' + $DateValue)
  $contentLines.Add('- 正式发布入口已切换到 ' + $VersionValue + '。')
  $contentLines.Add('- 上一正式版本：' + $PreviousVersion)
  $contentLines.Add('')
  $contentLines.Add('### 本次更新摘要')
  $contentLines.Add('')
  foreach ($item in $Items) {
    $contentLines.Add('- ' + $item)
  }
  $contentLines.Add('')
  $contentLines.Add('## ' + $VersionValue + ' 验证情况')
  $contentLines.Add('')
  $contentLines.Add('- 已同步更新 `play/index.html`。')
  $contentLines.Add('- 已同步更新 `index.html`。')
  $contentLines.Add('- 已同步更新 `updates/index.html`。')
  $contentLines.Add('- 已同步更新 `versions/index.html`。')
  $contentLines.Add('- 已同步更新 `records/index.html`。')
  $contentLines.Add('- 已将 ' + $PreviousVersion + ' 转入历史版本入口。')
  $contentLines.Add('- 完整记录页会自动按版本号从新到旧展示。')
  $content = $contentLines -join [Environment]::NewLine

  if ($ExistingBody) {
    return ($content.Trim() + [Environment]::NewLine + [Environment]::NewLine + $ExistingBody.Trim())
  }

  return $content.Trim()
}

function Remove-VersionEntry {
  param(
    [string]$BlockContent,
    [string]$VersionValue
  )
  $pattern = "(?s)\s*<article class=""entry"">.*?经典坦克大战平衡版$([regex]::Escape($VersionValue))\.html.*?</article>"
  return [regex]::Replace($BlockContent, $pattern, "")
}

function Get-VersionEntryBodies {
  param([string]$BlockContent)
  return [regex]::Matches($BlockContent, '(?s)<article class="entry">.*?</article>') | ForEach-Object { $_.Value.Trim() }
}

if (-not $PublishRoot) {
  $PublishRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
}
if (-not $ProjectRoot) {
  $ProjectRoot = Split-Path -Parent $PublishRoot
}

$PublishRoot = [System.IO.Path]::GetFullPath($PublishRoot)
$ProjectRoot = [System.IO.Path]::GetFullPath($ProjectRoot)

if (-not $Version) {
  $Version = Prompt-ForValue -Label "请输入新版本号（如 v3.9）"
}
$Version = Normalize-Version -InputVersion $Version

if (-not $ReleaseDate) {
  $ReleaseDate = Prompt-ForValue -Label "请输入发布日期" -Default (Get-Date -Format "yyyy-MM-dd")
}

$Bullets = Prompt-ForBullets -ExistingBullets $Bullets

$SourceFile = Join-Path $ProjectRoot "经典坦克大战平衡版$Version.html"
if (-not (Test-Path -LiteralPath $SourceFile)) {
  throw "未在项目根目录找到源版本文件：$SourceFile"
}

$PlayPath = Join-Path $PublishRoot "play\index.html"
$IndexPath = Join-Path $PublishRoot "index.html"
$UpdatesPath = Join-Path $PublishRoot "updates\index.html"
$VersionsPath = Join-Path $PublishRoot "versions\index.html"
$ReadmePath = Join-Path $PublishRoot "README.md"
$ProjectNotesPath = Join-Path $ProjectRoot "经典坦克大战平衡版版本调整说明.md"
$PublishNotesPath = Join-Path $PublishRoot "经典坦克大战平衡版版本调整说明.md"

$playContent = Get-RequiredContent -Path $PlayPath -Description "游玩入口页"
$indexContent = Get-RequiredContent -Path $IndexPath -Description "首页"
$updatesContent = Get-RequiredContent -Path $UpdatesPath -Description "更新页"
$versionsContent = Get-RequiredContent -Path $VersionsPath -Description "历史版本页"

$CurrentVersion = Get-CurrentVersionFromPlay -Content $playContent
if ($CurrentVersion -eq $Version) {
  throw "当前正式入口已经是 $Version，无需重复发布。"
}

$DestinationFile = Join-Path $PublishRoot "经典坦克大战平衡版$Version.html"
Copy-Item -LiteralPath $SourceFile -Destination $DestinationFile -Force

$playContent = Require-Replace -Content $playContent -Pattern '经典坦克大战平衡版v\d+(?:\.\d+)+\.html' -Evaluator {
  param($match)
  "经典坦克大战平衡版$Version.html"
} -Description "play/index.html 跳转版本文件"
$playContent = Require-Replace -Content $playContent -Pattern '(当前正式入口已指向 <strong>)(v\d+(?:\.\d+)+)(</strong>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + $Version + $match.Groups[3].Value
} -Description "play/index.html 当前版本提示"
$playContent = Require-Replace -Content $playContent -Pattern '(href="../)经典坦克大战平衡版v\d+(?:\.\d+)+\.html(">打开最新版本</a>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + "经典坦克大战平衡版$Version.html" + $match.Groups[2].Value
} -Description "play/index.html 打开最新版本按钮"

$indexContent = Require-Replace -Content $indexContent -Pattern '(当前正式入口指向\s*<strong>)(v\d+(?:\.\d+)+)(</strong>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + $Version + $match.Groups[3].Value
} -Description "首页主介绍版本号"
$indexContent = Require-Replace -Content $indexContent -Pattern '(<div class="pill">最新发布：)([^<]+)(</div>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + $ReleaseDate + $match.Groups[3].Value
} -Description "首页最新发布日期"
$indexContent = Require-Replace -Content $indexContent -Pattern '(<div class="pill">当前版本：)(v\d+(?:\.\d+)+)(</div>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + $Version + $match.Groups[3].Value
} -Description "首页当前版本标签"
$indexContent = Require-Replace -Content $indexContent -Pattern '(href="./)经典坦克大战平衡版v\d+(?:\.\d+)+\.html(">直接打开版本文件</a>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + "经典坦克大战平衡版$Version.html" + $match.Groups[2].Value
} -Description "首页直接打开版本文件链接"
$indexContent = Require-Replace -Content $indexContent -Pattern '(<span class="overview-kicker">当前正式版本</span>\s*<strong>)(v\d+(?:\.\d+)+)(</strong>)' -Evaluator {
  param($match)
  $match.Groups[1].Value + $Version + $match.Groups[3].Value
} -Description "首页当前版本概览卡片"
$indexContent = Set-MarkerBlock -Content $indexContent -StartMarker "AUTO_HOME_CURRENT_RELEASE_START" -EndMarker "AUTO_HOME_CURRENT_RELEASE_END" -NewBody (Build-HomeCurrentReleaseBlock -VersionValue $Version -DateValue $ReleaseDate -Items $Bullets)
$indexContent = Set-MarkerBlock -Content $indexContent -StartMarker "AUTO_HOME_HISTORY_START" -EndMarker "AUTO_HOME_HISTORY_END" -NewBody (Build-HomeHistoryBlock -CurrentVersion $Version -PreviousVersion $CurrentVersion)

$updateBlock = Get-MarkerBlock -Content $updatesContent -StartMarker "AUTO_UPDATE_RELEASES_START" -EndMarker "AUTO_UPDATE_RELEASES_END"
$existingUpdateBlock = Remove-VersionEntry -BlockContent $updateBlock.Body -VersionValue $Version
$newUpdateBlock = (Build-UpdateEntry -VersionValue $Version -DateValue $ReleaseDate -Items $Bullets).TrimEnd() + "`r`n`r`n" + $existingUpdateBlock.Trim()
$updatesContent = Set-MarkerBlock -Content $updatesContent -StartMarker "AUTO_UPDATE_RELEASES_START" -EndMarker "AUTO_UPDATE_RELEASES_END" -NewBody $newUpdateBlock.Trim()

$versionBlock = Get-MarkerBlock -Content $versionsContent -StartMarker "AUTO_VERSION_ENTRIES_START" -EndMarker "AUTO_VERSION_ENTRIES_END"
$existingVersionBlock = $versionBlock.Body
$existingVersionBlock = [regex]::Replace($existingVersionBlock, '当前正式版本', '历史版本', 1)
$existingVersionBlock = [regex]::Replace($existingVersionBlock, 'button primary', 'button secondary', 1)
$existingVersionBlock = Remove-VersionEntry -BlockContent $existingVersionBlock -VersionValue $Version
$currentSummary = "当前默认游玩入口，本次重点包括：$($Bullets[0])"
$newVersionBlock = (Build-VersionEntry -VersionValue $Version -IsCurrent $true -Summary $currentSummary).TrimEnd() + "`r`n`r`n" + $existingVersionBlock.Trim()
$versionsContent = Set-MarkerBlock -Content $versionsContent -StartMarker "AUTO_VERSION_ENTRIES_START" -EndMarker "AUTO_VERSION_ENTRIES_END" -NewBody $newVersionBlock.Trim()

Set-FileContent -Path $PlayPath -Content $playContent
Set-FileContent -Path $IndexPath -Content $indexContent
Set-FileContent -Path $UpdatesPath -Content $updatesContent
Set-FileContent -Path $VersionsPath -Content $versionsContent

$readmeContent = Build-ReadmeContent -RootPath $PublishRoot
Set-FileContent -Path $ReadmePath -Content $readmeContent

$notesTitle = "经典坦克大战平衡版版本调整说明"
$notesIntro = "本文档用于记录各版本相对前一版本的主要调整内容、影响范围和验证情况，便于后续持续迭代。"
$existingNotesBody = ""
if (Test-Path -LiteralPath $ProjectNotesPath) {
  $notesMeta = Get-NotesHeaderAndBody -Content (Get-RequiredContent -Path $ProjectNotesPath -Description "项目版本说明")
  $notesTitle = $notesMeta.Title
  $notesIntro = $notesMeta.Intro
  $existingNotesBody = $notesMeta.Body
}
$finalNotesContent = Build-ReleaseNotesMarkdown -Title $notesTitle -Intro $notesIntro -VersionValue $Version -DateValue $ReleaseDate -PreviousVersion $CurrentVersion -Items $Bullets -ExistingBody $existingNotesBody
Set-FileContent -Path $ProjectNotesPath -Content $finalNotesContent
Set-FileContent -Path $PublishNotesPath -Content $finalNotesContent

Write-Host ""
Write-Host "更新完成：" -ForegroundColor Green
Write-Host "  正式版本：$Version"
Write-Host "  上一正式版：$CurrentVersion"
Write-Host "  发布目录：$PublishRoot"
Write-Host ""
Write-Host "已更新文件：" -ForegroundColor Green
Write-Host "  - $DestinationFile"
Write-Host "  - $PlayPath"
Write-Host "  - $IndexPath"
Write-Host "  - $UpdatesPath"
Write-Host "  - $VersionsPath"
Write-Host "  - $ReadmePath"
Write-Host "  - $ProjectNotesPath"
Write-Host "  - $PublishNotesPath"
