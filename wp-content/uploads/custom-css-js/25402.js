<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
/* Default comment here */ 
// Mengambil elemen span
var spanElement = document.querySelector('.portfolio_page_details_item_value');

// Mendapatkan teks HTML dari elemen span
var htmlContent = spanElement.innerHTML;

// Mengganti tag <br> dengan karakter newline (\n)
var renderedContent = htmlContent.replace(/<br\s*\/?>/gi, "\n");

// Mengatur kembali konten HTML elemen span dengan teks yang telah diubah
spanElement.innerHTML = renderedContent;
</script>
<!-- end Simple Custom CSS and JS -->
