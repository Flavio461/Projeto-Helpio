Param(
  [string]$SourceDir = (Resolve-Path '..'),
  [string]$OutDir = (Join-Path (Resolve-Path '..') 'dist')
)

Write-Host "Building to" $OutDir
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function Minify-Css($content) {
  $c = $content -replace '/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', '' 
  $c = $c -replace '(?m)^\s*//.*$', ''
  $c = $c -replace '(?m)(?<!:)//.*$', ''
  $c = $c -replace '\s+', ' '                                 
  $c = $c -replace '\s*([{};:,>])\s*', '$1'                   
  return $c.Trim()
}

function Minify-Js($content) {
  $c = $content -replace '/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', '' 
  $c = $c -replace '(?m)^\s*//.*$', ''                        
  $c = $c -replace '(?m)(?<!:)//.*$', ''
  $c = $c -replace '\s+', ' '                                 
  $c = $c -replace '\s*([{};:,=\(\)\[\]])\s*', '$1'
  return $c.Trim()
}

function Minify-Html($content) {
  $c = $content -replace 'href="css/([^"\?]+?)(?<!\.min)\.css"', 'href="css/$1.min.css"'
  $c = $c -replace 'src="js/([^"\?]+?)(?<!\.min)\.js"', 'src="js/$1.min.js"'
  $c = $c -replace '(?s)<!--(?!\[if|<!\[endif)[\s\S]*?-->', ''
  $c = $c -replace '>\s+<', '><'                                    
  $c = $c -replace '\s+', ' '                                       
  return $c.Trim()
}

# Copia imgs e svg
Copy-Item (Join-Path $SourceDir 'img') $OutDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item (Join-Path $SourceDir 'svg') $OutDir -Recurse -Force -ErrorAction SilentlyContinue

# CSS minificado
$cssOut = Join-Path $OutDir 'css'
New-Item -ItemType Directory -Force -Path $cssOut | Out-Null
Get-ChildItem -Path (Join-Path $SourceDir 'css') -Filter *.css | ForEach-Object {
  $min = Minify-Css (Get-Content $_.FullName -Raw)
  $name = ($_.BaseName + '.min.css')
  Set-Content -Path (Join-Path $cssOut $name) -Value $min -NoNewline
}

# JS minificado
$jsOut = Join-Path $OutDir 'js'
New-Item -ItemType Directory -Force -Path $jsOut | Out-Null
Get-ChildItem -Path (Join-Path $SourceDir 'js') -Filter *.js | ForEach-Object {
  $min = Minify-Js (Get-Content $_.FullName -Raw)
  $name = ($_.BaseName + '.min.js')
  Set-Content -Path (Join-Path $jsOut $name) -Value $min -NoNewline
}

# HTML minificado
Get-ChildItem -Path $SourceDir -Filter *.html | ForEach-Object {
  $min = Minify-Html (Get-Content $_.FullName -Raw)
  $name = $_.Name
  Set-Content -Path (Join-Path $OutDir $name) -Value $min -NoNewline
}

Write-Host "Done. Check dist/ for minified assets."