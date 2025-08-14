# Script para verificar y probar endpoints del backend

# Verificar si el backend está corriendo
Write-Host "Verificando endpoints del backend..." -ForegroundColor Green

# Test 1: Propiedades
try {
    $properties = Invoke-RestMethod -Uri "http://localhost:5064/api/Properties" -Method GET
    Write-Host "✅ Endpoint /api/Properties funciona - Encontradas $($properties.Count) propiedades" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en /api/Properties: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Owners
try {
    $owner = Invoke-RestMethod -Uri "http://localhost:5064/api/Owners/1" -Method GET
    Write-Host "✅ Endpoint /api/Owners/1 funciona - Owner: $($owner.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en /api/Owners/1: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: PropertyImages
try {
    $images = Invoke-RestMethod -Uri "http://localhost:5064/api/PropertyImages/property/1" -Method GET
    Write-Host "✅ Endpoint /api/PropertyImages/property/1 funciona - Encontradas $($images.Count) imágenes" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en /api/PropertyImages/property/1: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: PropertyTraces
try {
    $traces = Invoke-RestMethod -Uri "http://localhost:5064/api/PropertyTraces/property/1" -Method GET
    Write-Host "✅ Endpoint /api/PropertyTraces/property/1 funciona - Encontrados $($traces.Count) traces" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en /api/PropertyTraces/property/1: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nPara usar este script, ejecuta desde PowerShell:" -ForegroundColor Yellow
Write-Host ".\test-backend.ps1" -ForegroundColor Yellow
