// Funcao para exportar para PNG
function exportPng(idElement, namePng) {

    var elementToExport = '#' + idElement;
    var pngName = namePng + '.png';

    html2canvas($(elementToExport), {
        onrendered: function (canvas) {
            // Canvas2Image.saveAsPNG(canvas);
            var url = canvas.toDataURL();
            $("<a>", {
                href: url,
                download: pngName
            })
            .on("click", function () {
                $(this).remove();
            })
            .appendTo("body")[0].click();
        }
    });
}

// Funcao para exportar para PDF
function exportPdf(idElement, namePdf) {

    var elementToExport = '#' + idElement;
    var pdfName = namePdf + '.pdf';

    var pdf = new jsPDF('p', 'pt', 'letter')
        , source = $(elementToExport)[0]
        , specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true;
            },
            '.hide': function (element, renderer) {
                return true;
            }
        }
    
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    pdf.fromHTML(
        source
        , margins.left
        , margins.top
        , {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.save(pdfName);
        },
        margins
    );
}