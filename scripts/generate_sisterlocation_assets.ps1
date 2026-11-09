Add-Type -AssemblyName System.Drawing

$destDir = "c:\Users\PC-1802\Downloads\Ashi\games\sisterlocation\assets"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

function Save-Jpeg($bmp, $path, $quality = 90) {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($path, $codec, $params)
}

function Draw-Head($g, $id, $cx, $cy, $scale, $spread = 0.3) {
    $r = 90.0 * $scale
    $sp = $spread * 28.0 * $scale
    
    # Endo skull
    $endoBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(46, 48, 56))
    $wireBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(115, 122, 133))
    $g.FillRectangle($endoBrush, ($cx - $r * 0.65), ($cy - $r * 0.75), ($r * 1.3), ($r * 1.5))
    for ($i = -2; $i -le 2; $i++) {
        $g.FillRectangle($wireBrush, ($cx + $i * 18 * $scale - 3), ($cy - $r * 0.7), (6 * $scale), ($r * 1.35))
    }
    
    # Eyes
    $eyeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 197, 94))
    if ($id -eq "ennard") { $eyeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(56, 189, 248)) }
    if ($id -eq "ballora") { $eyeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(217, 70, 239)) }
    if ($id -eq "freddy") { $eyeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(56, 189, 248)) }
    
    $blackBrush = [System.Drawing.Brushes]::Black
    $g.FillRectangle($blackBrush, ($cx - $r * 0.48), ($cy - $r * 0.28), ($r * 0.32), ($r * 0.26))
    $g.FillRectangle($blackBrush, ($cx + $r * 0.16), ($cy - $r * 0.28), ($r * 0.32), ($r * 0.26))
    $g.FillRectangle($eyeBrush, ($cx - $r * 0.40), ($cy - $r * 0.22), ($r * 0.16), ($r * 0.15))
    $g.FillRectangle($eyeBrush, ($cx + $r * 0.24), ($cy - $r * 0.22), ($r * 0.16), ($r * 0.15))
    
    # Jaw
    $jawBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(141, 148, 158))
    $g.FillRectangle($jawBrush, ($cx - $r * 0.42), ($cy + $r * 0.25), ($r * 0.84), ($r * 0.32))
    for ($t = 0; $t -lt 6; $t++) {
        $g.FillRectangle([System.Drawing.Brushes]::White, ($cx - $r * 0.36 + $t * ($r * 0.13)), ($cy + $r * 0.18), ($r * 0.09), ($r * 0.09))
    }
    
    # Shell Faceplates
    $shellBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(243, 244, 246))
    $cheekBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(225, 29, 72))
    $pigtailBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(194, 65, 12))
    
    if ($id -eq "baby") {
        $g.FillRectangle($pigtailBrush, ($cx - $r * 1.55 - $sp * 0.4), ($cy - $r * 0.85), ($r * 0.55), ($r * 1.3))
        $g.FillRectangle($pigtailBrush, ($cx + $r * 1.0 + $sp * 0.4), ($cy - $r * 0.85), ($r * 0.55), ($r * 1.3))
    }
    
    $plateW = $r * 0.82
    $plateH = $r * 0.78
    
    # Top-Left & Top-Right
    $g.FillRectangle($shellBrush, ($cx - $plateW - $sp - 2), ($cy - $plateH - $sp - 2), $plateW, ($plateH * 0.55))
    $g.FillRectangle($shellBrush, ($cx + $sp + 2), ($cy - $plateH - $sp - 2), $plateW, ($plateH * 0.55))
    
    # Bottom-Left & Bottom-Right + Cheeks
    $g.FillRectangle($shellBrush, ($cx - $plateW - $sp - 2), ($cy + $sp + 2), $plateW, ($plateH * 0.85))
    $g.FillRectangle($cheekBrush, ($cx - $plateW * 0.75 - $sp), ($cy + $plateH * 0.15 + $sp), ($r * 0.28), ($r * 0.28))
    
    $g.FillRectangle($shellBrush, ($cx + $sp + 2), ($cy + $sp + 2), $plateW, ($plateH * 0.85))
    $g.FillRectangle($cheekBrush, ($cx + $plateW * 0.45 + $sp), ($cy + $plateH * 0.15 + $sp), ($r * 0.28), ($r * 0.28))
    
    # Red Nose
    $noseBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(239, 68, 68))
    $g.FillRectangle($noseBrush, ($cx - $r * 0.14), ($cy - $r * 0.04), ($r * 0.28), ($r * 0.18))
}

# 1. Generate cover.jpg (1280x720)
$cover = New-Object System.Drawing.Bitmap(1280, 720)
$g = [System.Drawing.Graphics]::FromImage($cover)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Background dark gradient
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0, 0)),
    (New-Object System.Drawing.Point(1280, 720)),
    [System.Drawing.Color]::FromArgb(8, 12, 22),
    [System.Drawing.Color]::FromArgb(3, 3, 6)
)
$g.FillRectangle($bgBrush, 0, 0, 1280, 720)

# Cyan ambient back light
$glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 34, 211, 238))
$g.FillEllipse($glowBrush, 750, 150, 500, 500)

# Circus Baby & Ennard
Draw-Head $g "baby" 950 360 2.2 0.35
Draw-Head $g "ennard" 350 480 1.2 0.25

# Overlay grid
$penGrid = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(18, 56, 189, 248), 1)
for ($y = 0; $y -lt 720; $y += 30) { $g.DrawLine($penGrid, 0, $y, 1280, $y) }
for ($x = 0; $x -lt 1280; $x += 60) { $g.DrawLine($penGrid, $x, 0, $x, 720) }

# Title Typography
$fontTitleH1 = New-Object System.Drawing.Font("Arial Black", 38, [System.Drawing.FontStyle]::Bold)
$fontTitleH2 = New-Object System.Drawing.Font("Arial Black", 26, [System.Drawing.FontStyle]::Bold)
$fontBadge = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Segoe UI", 15, [System.Drawing.FontStyle]::Regular)

$orangeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 88, 12))
$cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(56, 189, 248))
$whiteBrush = [System.Drawing.Brushes]::White
$goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 204, 21))

$g.DrawString("FIVE NIGHTS AT FREDDY'S", $fontTitleH1, $orangeBrush, 80, 100)
$g.DrawString("S I S T E R   L O C A T I O N", $fontTitleH2, $whiteBrush, 85, 175)
$g.DrawString("★ ★ ★ ★  4 STARS · 21 SCENES · CUSTOM NIGHT 10/20", $fontBadge, $goldBrush, 85, 245)
$descBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(203, 213, 225))
$g.DrawString("Story Mode Nights 1–5 · Real & Fake Endings · 8-Bit Baby Minigame`nCanonical Technical Blueprints · Michael Afton 8-Bit Decay Finale", $fontSub, $descBrush, 85, 300)

# Badge Pills
$badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(200, 15, 23, 42))
$badgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(56, 189, 248), 2)
$badgeFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$g.FillRectangle($badgeBg, 85, 420, 480, 52)
$g.DrawRectangle($badgePen, 85, 420, 480, 52)
$g.DrawString("100% PROCEDURAL GRAPHICS & WEB AUDIO SYNTHESIS", $badgeFont, $cyanBrush, 100, 435)

$g.Dispose()
Save-Jpeg $cover (Join-Path $destDir "cover.jpg")
$cover.Dispose()

# 2. Generate icon.png (256x256)
$icon = New-Object System.Drawing.Bitmap(256, 256)
$gi = [System.Drawing.Graphics]::FromImage($icon)
$gi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gi.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(8, 10, 16))), 0, 0, 256, 256)
Draw-Head $gi "baby" 128 128 1.15 0.25
$gi.Dispose()
$icon.Save((Join-Path $destDir "icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$icon.Dispose()

# 3. Screenshot 1: Title Screen
$s1 = New-Object System.Drawing.Bitmap(1280, 720)
$gs1 = [System.Drawing.Graphics]::FromImage($s1)
$gs1.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(8, 8, 13))), 0, 0, 1280, 720)
Draw-Head $gs1 "baby" 880 360 2.15 0.35
$gs1.DrawString("FIVE NIGHTS AT FREDDY'S", $fontTitleH1, $orangeBrush, 80, 60)
$gs1.DrawString("S I S T E R   L O C A T I O N", $fontTitleH2, $whiteBrush, 82, 120)
$gs1.DrawString("★ STAR 1: REAL ENDING (SCOOPED)`n★ STAR 2: 8-BIT BABY MINIGAME`n★ STAR 3: FAKE ENDING (PRIVATE ROOM)`n★ STAR 4: GOLDEN FREDDY 10/20 V.HARD", $fontSub, $goldBrush, 80, 180)
$gs1.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 38, 56))), 80, 340, 320, 50)
$gs1.DrawString("CONTINUE (NIGHT 5)", $fontBadge, $whiteBrush, 100, 350)
$gs1.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(69, 42, 10))), 80, 410, 320, 50)
$gs1.DrawString("CUSTOM NIGHT (UNLOCKED)", $fontBadge, $goldBrush, 90, 420)
$gs1.Dispose()
Save-Jpeg $s1 (Join-Path $destDir "screenshot_1.jpg")
$s1.Dispose()

# 4. Screenshot 2: Primary Control
$s2 = New-Object System.Drawing.Bitmap(1280, 720)
$gs2 = [System.Drawing.Graphics]::FromImage($s2)
$gs2.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(12, 15, 23))), 0, 0, 1280, 720)
# Windows
$gs2.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 36, 54))), 60, 90, 360, 290)
Draw-Head $gs2 "ballora" 240 240 1.25 0
$gs2.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 36, 54))), 860, 90, 360, 290)
Draw-Head $gs2 "freddy" 1040 240 1.25 0
Draw-Head $gs2 "ennard" 640 160 0.9 0
$gs2.DrawString("PRIMARY CONTROL MODULE — CONTROLLED SHOCK KEYPADS", $fontBadge, $cyanBrush, 320, 40)
$gs2.Dispose()
Save-Jpeg $s2 (Join-Path $destDir "screenshot_2.jpg")
$s2.Dispose()

# 5. Screenshot 3: Private Room & Custom Night 10/20
$s3 = New-Object System.Drawing.Bitmap(1280, 720)
$gs3 = [System.Drawing.Graphics]::FromImage($s3)
$gs3.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(6, 8, 14))), 0, 0, 1280, 720)
# Doors
$gs3.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 38, 38))), 80, 120, 180, 480)
$gs3.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 41, 59))), 1020, 120, 180, 480)
Draw-Head $gs3 "ennard" 640 320 1.6 0.3
$gs3.DrawString("PRIVATE ROOM: ENNARD BOSS FIGHT (4 AM | POWER: 68%)", $fontBadge, $cyanBrush, 340, 40)
$gs3.Dispose()
Save-Jpeg $s3 (Join-Path $destDir "screenshot_3.jpg")
$s3.Dispose()

# 6. Screenshot 4: 8-Bit Baby Minigame
$s4 = New-Object System.Drawing.Bitmap(1280, 720)
$gs4 = [System.Drawing.Graphics]::FromImage($s4)
$gs4.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(2, 6, 23))), 0, 0, 1280, 720)
$gs4.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(22, 163, 74))), 0, 540, 1280, 180)
$gs4.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 38, 38))), 200, 455, 44, 85)
$gs4.FillRectangle([System.Drawing.Brushes]::White, 206, 420, 32, 35)
$gs4.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 211, 238))), 550, 490, 30, 45)
$gs4.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 211, 238))), 850, 490, 30, 45)
$gs4.DrawString("CIRCUS BABY 8-BIT MINIGAME (TIME: 42s | PINK/BLUE/GREEN CUPCAKES)", $fontBadge, $goldBrush, 220, 60)
$gs4.Dispose()
Save-Jpeg $s4 (Join-Path $destDir "screenshot_4.jpg")
$s4.Dispose()

# 7. Screenshot 5: Night 4 Springlock Suit Survival
$s5 = New-Object System.Drawing.Bitmap(1280, 720)
$gs5 = [System.Drawing.Graphics]::FromImage($s5)
$gs5.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(10, 8, 12))), 0, 0, 1280, 720)
$gs5.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(21, 25, 36))), 100, 80, 500, 360)
$gs5.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(21, 25, 36))), 680, 80, 500, 360)
Draw-Head $gs5 "baby" 130 350 0.6 0
Draw-Head $gs5 "baby" 1150 420 0.6 0
$gs5.DrawString("NIGHT 4: SPRINGLOCK SUIT SURVIVAL (KEEP 10 SPRINGLOCKS WOUND TIGHT)", $fontBadge, $goldBrush, 180, 30)
$gs5.Dispose()
Save-Jpeg $s5 (Join-Path $destDir "screenshot_5.jpg")
$s5.Dispose()

Write-Output "All 7 SisterLocation image assets generated successfully!"
