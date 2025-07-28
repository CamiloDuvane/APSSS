const { jsPDF } = window.jspdf;

function formatDateForDisplay(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput + 'T00:00:00');
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate.replace(/ /g, '-');
}

function formatCurrency(value) {
    if (value === null || value === '' || isNaN(value)) return '';
    const number = Number(value);
    const formatted = new Intl.NumberFormat('pt-PT', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
    return `MZN ${formatted}`;
}

function getFormData() {
    return {
        companyName: document.getElementById('companyName').value,
        containerNumber: document.getElementById('containerNumber').value,
        cobDate: formatDateForDisplay(document.getElementById('cobDate').value),
        consignee: document.getElementById('consignee').value,
        contact: document.getElementById('contact').value,
        arrivalDate: formatDateForDisplay(document.getElementById('arrivalDate').value),
        paymentDueDate: formatDateForDisplay(document.getElementById('paymentDueDate').value),
        merchandiseDesc: document.getElementById('merchandiseDesc').value,
        volumeQty: document.getElementById('volumeQty').value,
        totalCBMs: document.getElementById('totalCBMs').value,
        usdMzmExchange: document.getElementById('usdMzmExchange').value,
        maritimeFreight: document.getElementById('maritimeFreight').value ? parseFloat(document.getElementById('maritimeFreight').value).toFixed(2) : '',
        importExpenses: formatCurrency(document.getElementById('importExpenses').value)
    };
}

function previewDocument() {
    const data = getFormData();
    document.title = `${data.companyName || 'Cotacao'} - ${data.containerNumber || 'N_A'}`;

    const previewContent = `
<div class="invoice-box" id="invoice-box">
    <div class="header">
        <div class="header-left">
            <img src="APSSS" alt="APSSS Logo" class="logo">
        </div>
        <div class="header-right">
            <p>Bairro Guava, Rua Principal do Guava Q.23 Parcela 18, Maputo</p>
            <p>E-MAIL: alicess2011@gmail.com</p>
            <p>CONCTACT: +258 840234121/833834785</p>
        </div>
    </div>
    
    <hr class="header-separator">
    
    <div class="china-office">
        <p><strong>CHINA OFFICE</strong></p>
        <p><strong>Company name: Guangzhou Bovet Supply Chain Management Co., Ltd.</strong></p>
        <p><strong>Office address: Room C106, 3rdFloor, Nº.27, Guangyuan West Road, Yuexiu District, Guangzhou, China</strong></p>
        <p><strong>TEL:+86 13512705811 Email: 327997919@qq.com</strong></p>
    </div>
    
    <hr class="separator-line">
    
    <div class="title-section">
        <div class="line"></div>
        <h2 class="title">AVISO DE COBRANÇA</h2>
        <div class="line"></div>
        <div class="date-info">
            <strong>DATA:</strong> ${data.cobDate}
        </div>
    </div>
    
    <div class="details-section">
        <div class="details-left">
            <p><strong>NR DO CONTENTOR:</strong> ${data.containerNumber}</p>
            <p><strong>CONSIGNATÁRIO:</strong> ${data.consignee}</p>
            <p><strong>CONTACTO:</strong> ${data.contact}</p>
            <p><strong>DESCRIÇÃO DA MERCADORIA:</strong> ${data.merchandiseDesc}</p>
        </div>
        <div class="details-right">
            <p><strong>PREVISÃO DE CHEGADA:</strong> ${data.arrivalDate}</p>
            <p><strong>ÚLTIMO DIA DE PAGAMENTO:</strong> ${data.paymentDueDate}</p>
        </div>
    </div>

    <div class="financial-section">
        <div class="financial-row">
            <span class="financial-label">LOADING LIST:</span>
        </div>
        <div class="financial-row">
            <span class="financial-label">QUANTIDADE DE VOLUMES:</span>
            <span class="financial-value">${data.volumeQty}</span>
        </div>
        <div class="financial-row">
            <span class="financial-label">TOTAL DE CBM'S:</span>
            <span class="financial-value">${data.totalCBMs}</span>
        </div>
         <div class="financial-row">
            <span class="financial-label">CÂMBIO USD/MZM:</span>
            <span class="financial-value">${data.usdMzmExchange}</span>
        </div>
        <div class="financial-row">
            <span class="financial-label">FRETE MARÍTICO(00USD/CBM):</span>
            <span class="financial-value">${data.maritimeFreight}</span>
            <span class="financial-total">MZM 0,00</span>
        </div>
        <div class="financial-row">
            <span class="financial-label">DESPESAS DE IMPORTAÇÃO(11,500,00MT/CBM):</span>
            <span class="financial-value">${data.importExpenses}</span>
        </div>
    </div>
    
    <hr class="separator-line">

    <div class="termos-condicoes">
        <h3><u>Termos e Condições para Grupagens China-Maputo</u></h3>
        <ol>
            <li>Com vista a suportar os encargos (aduaneiros e logisticos) das mercadorias, o pagamento do valor Aviso de cobrança, correspondente aos CBM'S deve ser efectuada antes da chegada do Navio ao Porto (no máximo 2 dias antes da chegada).</li>
            <li>O não pagamento antecipado, retira o benefício dos 03 dias livres em armazem, aplicando-se um custo adicional de 150.00mt por CBM/Dia desde a data de descarga, até a data do Levantamento da carga.</li>
            <li>Os valores apresentados excluem Seguro da mercadoria, o que significa que a mercadoria viaja por conta e risco do cliente.</li>
            <li>De forma a garantir segurança dos bens/mercadorias, não permitiremos acesso de pessoas estranhas ao armazem.</li>
            <li>Se for a enviar outra pessoa para levantar a sua mercadoria, deve informar com antecedência, dando a devida identificação da pessoa.</li>
            <li>No ato de levantamento da mercadoria, é obrigatório assinar o POD LIST e a Guia de Remessa Transporte (nome Legivel, Data e Número de Telefone).</li>
            <li>A Qualidade da carga/Mercadoria (presença ou ausência de danos), deve ser confirmada antes do levantamento/Recepção da mesma.</li>
            <li>Não nos responsabilizamos pelos danos causados a carga mal embalada, durante o transporte maritimo/Entrega ao Domicilio.</li>
            <li>Em caso de carga danificada, a mesma será reportada ao Agente na China, de modo que se avalie se o dano foi durante o transporte ou enchimento. Bem como a decisão da respectiva reposição.</li>
            <li>Ficaremos com a carga/Mercadoria ate 30 dias apos a descarga do contentor.</li>
            <li>O não Pagamento e levantamento da carga/mercadoria em 30 dias, da direito a perda da mesma.</li>
            <li>Os pagamentos devem ser efectuados nas contas da Alice Palmira Samuel Sindane Sitoe conforme os dados abaixo e enviar o respectivo comprovativo por WhatsApp para os Nr:+258 840234121/833834785</li>
        </ol>
    </div>
     <hr class="separator-line">

    <div class="dados-bancarios">
        <p><strong>Dados Bancarios - Alice Palmira Samuel Sindane Sitoe</strong></p>
        <table>
            <thead>
                <tr>
                    <th>BANCO</th>
                    <th>Nr de Conta</th>
                    <th>NIB</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>BCI</td>
                    <td>2632599510002</td>
                    <td>000800002632599510277</td>
                </tr>
                <tr>
                    <td>M.BIM</td>
                    <td>121545851</td>
                    <td>000100000012154585157</td>
                </tr>
                <tr>
                    <td>Standardbank</td>
                    <td>10709288741009</td>
                    <td>000301070928874100951</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    `;
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = previewContent;

    document.getElementById('form-section').style.display = 'none';
    document.getElementById('preview-section').style.display = 'block';
    window.scrollTo(0, 0); // Scroll to top
}

function editDocument() {
    document.getElementById('preview-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
}

function downloadPDF() {
    const data = getFormData();
    const invoice = document.getElementById('invoice-box');
    if (!invoice) {
        console.error("Preview area not found.");
        return;
    }
    
    // Temporarily apply print styles for PDF generation
    document.body.classList.add('print-pdf-mode');

    // To ensure consistency across devices, we temporarily set a fixed width
    // for the invoice box before rendering it with html2canvas.
    const originalWidth = invoice.style.width;
    invoice.style.width = '800px';

    html2canvas(invoice, {
        scale: 2, // Higher scale for better quality
        useCORS: true 
    }).then(canvas => {
        // Restore original width after canvas is created
        invoice.style.width = originalWidth;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasHeight / canvasWidth;

        let imgWidth = pdfWidth;
        let imgHeight = imgWidth * ratio;
        
        // If image height is greater than page height, scale down to fit
        if (imgHeight > pdfHeight) {
            imgHeight = pdfHeight;
            imgWidth = imgHeight / ratio;
        }

        // Center the image
        const x = (pdfWidth - imgWidth) / 2;
        const y = 0;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`${data.companyName || 'Cotacao'}-${data.containerNumber || 'N_A'}.pdf`);

        // Remove the temporary class
        document.body.classList.remove('print-pdf-mode');
    }).catch(err => {
        console.error("Error generating PDF:", err);
        // Ensure styles are restored even if there's an error
        invoice.style.width = originalWidth;
        document.body.classList.remove('print-pdf-mode');
    });
}

function resetFields() {
    // Select all input and textarea elements within the form section
    const inputs = document.querySelectorAll('#form-section input, #form-section textarea');
    inputs.forEach(input => {
        if (input.type === 'date') {
            input.value = '';
        } else {
            input.value = '';
        }
    });
    // Hide preview and show form
    editDocument();
}

document.addEventListener('DOMContentLoaded', function() {
    resetFields();
    editDocument(); // Ensure form is visible on load

    const totalCBMsInput = document.getElementById('totalCBMs');
    const importExpensesInput = document.getElementById('importExpenses');
    const importRate = 11500;

    function calculateImportExpenses() {
        const cbmValue = parseFloat(totalCBMsInput.value);
        if (!isNaN(cbmValue) && cbmValue > 0) {
            const expenses = cbmValue * importRate;
            importExpensesInput.value = expenses.toFixed(2);
        } else {
            importExpensesInput.value = '';
        }
    }

    if(totalCBMsInput) {
        totalCBMsInput.addEventListener('input', calculateImportExpenses);
    }
});
