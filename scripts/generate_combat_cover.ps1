Add-Type -AssemblyName System.Drawing

$width = 800
$height = 450
$bmp = [System.Drawing.Bitmap]::new($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background dark blood red & black gradient
$p1 = [System.Drawing.Point]::new(0, 0)
$p2 = [System.Drawing.Point]::new(0, $height)
$c1 = [System.Drawing.Color]::FromArgb(45, 8, 8)
$c2 = [System.Drawing.Color]::FromArgb(10, 2, 2)
$brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($p1, $p2, $c1, $c2)
$g.FillRectangle($brush, 0, 0, $width, $height)

# Draw dramatic fiery radial aura
$glowColor = [System.Drawing.Color]::FromArgb(90, 230, 60, 0)
$glowBrush = [System.Drawing.SolidBrush]::new($glowColor)
$g.FillEllipse($glowBrush, 120, 40, 560, 370)

# Golden border frame
$borderPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(180, 212, 160, 23), 4)
$g.DrawRectangle($borderPen, 10, 10, $width - 20, $height - 20)
$innerPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(100, 255, 60, 0), 1)
$g.DrawRectangle($innerPen, 16, 16, $width - 32, $height - 32)

# Load Fire Ashi and Goro Ashi
$firePath = "games/ashicombat/assets/fighters/fire_ashi.jpg"
$goroPath = "games/ashicombat/assets/fighters/goro_ashi.jpg"

if (Test-Path $firePath) {
    $img1 = [System.Drawing.Image]::FromFile((Resolve-Path $firePath))
    # Draw fire ashi with card border
    $cardPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220, 180, 0), 3)
    $g.DrawImage($img1, 45, 85, 230, 300)
    $g.DrawRectangle($cardPen, 45, 85, 230, 300)
    $img1.Dispose()
}

if (Test-Path $goroPath) {
    $img2 = [System.Drawing.Image]::FromFile((Resolve-Path $goroPath))
    # Draw goro ashi with card border
    $cardPen2 = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220, 50, 50), 3)
    $g.DrawImage($img2, 525, 85, 230, 300)
    $g.DrawRectangle($cardPen2, 525, 85, 230, 300)
    $img2.Dispose()
}

$fontTitle = [System.Drawing.Font]::new("Impact", [single]44.0, [System.Drawing.FontStyle]::Bold)
$fontSub = [System.Drawing.Font]::new("Arial", [single]14.0, [System.Drawing.FontStyle]::Bold)
$fontVs = [System.Drawing.Font]::new("Impact", [single]58.0, [System.Drawing.FontStyle]::Bold)
$fontThai = [System.Drawing.Font]::new("Tahoma", [single]12.0, [System.Drawing.FontStyle]::Bold)

$redBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 40, 40))
$goldBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 215, 0))
$whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$shadowBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(200, 0, 0, 0))

# Format center alignment
$sf = [System.Drawing.StringFormat]::new()
$sf.Alignment = [System.Drawing.StringAlignment]::Center

# VS Emblem in the middle
$g.DrawString("VS", $fontVs, $shadowBrush, [single]402.0, [single]192.0, $sf)
$g.DrawString("VS", $fontVs, $goldBrush, [single]400.0, [single]190.0, $sf)

# Top Title
$g.DrawString("ASHI KOMBAT", $fontTitle, $shadowBrush, [single]402.0, [single]22.0, $sf)
$g.DrawString("ASHI KOMBAT", $fontTitle, $redBrush, [single]400.0, [single]20.0, $sf)

$g.DrawString("MORTAL MEME TOURNAMENT", $fontSub, $shadowBrush, [single]401.0, [single]73.0, $sf)
$g.DrawString("MORTAL MEME TOURNAMENT", $fontSub, $whiteBrush, [single]400.0, [single]72.0, $sf)

# Subtitle bottom
$grayBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(200, 200, 200))
$g.DrawString("CHOOSE YOUR ASHI - FINISH HIM!", $fontSub, $goldBrush, [single]400.0, [single]396.0, $sf)
$g.DrawString("ศึกต่อสู้เลือดสาดสไตล์ Mortal Kombat", $fontThai, $grayBrush, [single]400.0, [single]418.0, $sf)

$bmp.Save("games/ashicombat/assets/cover.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also create icon 192x192
$iconBmp = [System.Drawing.Bitmap]::new(192, 192)
$ig = [System.Drawing.Graphics]::FromImage($iconBmp)
$ig.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ig.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = [System.Drawing.Rectangle]::new(150, 10, 500, 430)
$dstRect = [System.Drawing.Rectangle]::new(0, 0, 192, 192)
$ig.DrawImage($bmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$iconBmp.Save("games/ashicombat/assets/icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

$ig.Dispose()
$iconBmp.Dispose()
$g.Dispose()
$bmp.Dispose()
Write-Host "Updated Cover and Icon generated!"
