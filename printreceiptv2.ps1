
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
$doc = $wordobj.documents.Add($templatename)

$wordobj.Documents.Open($templatename) > $null
$objselection = $wordobj.Selection
$wdFindContinue = 1 
$MatchCase = $false 
$MatchWholeWord = $true 
$MatchWildcards = $false 
$MatchSoundsLike = $false 
$MatchAllWordForms = $false 
$Forward = $true 
$Wrap = $wdFindContinue 
$Format = $False 
$ReplaceAll = 2 
$ReplaceWith = $replacetext 

 $objrange = $doc.Bookmarks.Item($findtext).Range
 $objrange.Text = $replacetext

#$a = $objselection.Find.Execute($findtext,$MatchCase,$MatchWholeWord,$MatchWildcards,$MatchSoundsLike,$MatchAllWordForms,$Forward,$Wrap,$Format,$ReplaceWith,$ReplaceAll) 
$newname = "recepitprint.docx"
#$wordobj.Save($newname)
#$wordobj.ActiveDocument.Content.Font.Size = 8
#$wordobj.ActiveDocument.Content.Font.Name = "Verdana"
$wordobj.ActiveDocument.PrintOut()
Start-Sleep -s 1
$wordobj.Quit([ref]$false)
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($wordobj)
Remove-Variable wordobj

#Reset the default printer
$defaultPrinter.SetDefaultPrinter() | Out-Null

