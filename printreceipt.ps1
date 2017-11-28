
$allp = Get-WmiObject -Class Win32_Printer
$defaultPrinter = $allp | Where-Object {$_.Default -eq $true}
$receiptPrinter = $allp | Where-object {$_.Name -like "*TM-T81*"} #*TM-T81*

$receiptPrinter.SetDefaultPrinter() | Out-Null
$pname = $receiptPrinter.Name
#Set-PrintConfiguration -PrinterName $pname -PaperSize "PRC32k"
# Create the word document and print out
$templatename = $PSScriptRoot+"\receipt_template.docx"
$datafilename = $PSScriptRoot+"\receipt.txt"
$findtext = "DATA"
$replacetext = [IO.File]::ReadAllText($datafilename) #Get-Content $datafilename

$wordobj = New-Object -ComObject Word.Application
$doc = $wordobj.Documents.Add($templatename)
$objrange = $doc.Bookmarks.Item($findtext).Range
$objrange.Text = $replacetext


$wordobj.ActiveDocument.PrintOut()
Start-Sleep -s 1
$wordobj.Quit([ref]$false)
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wordobj)
Remove-Variable wordobj

#Reset the default printer
$defaultPrinter.SetDefaultPrinter() | Out-Null

