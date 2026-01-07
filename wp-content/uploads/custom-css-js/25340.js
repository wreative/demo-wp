<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
/* Default comment here */ 


var elements = document.querySelectorAll('.portfolio_page_details_item_value');

// Loop melalui setiap elemen
elements.forEach(function(element) {
    // Jika teks elemen dimulai dengan "*"
    if (element.textContent.trim().startsWith('*')) {
		
// 		var portfolioDetailsItemValue = document.querySelectorAll('.portfolio_page_details_item_value');
// 		portfolioDetailsItemValue.forEach(function(itemValue) {
			element.style.width = '100%';
// 		}); 
		
        // Membuat elemen ul baru
        var ul = document.createElement('ul');
        
        // Memisahkan teks menjadi array berdasarkan tanda "*"
        var items = element.textContent.trim().split('*');
        
        // Menghapus elemen pertama (karena kosong setelah split)
        items.shift();
        
        // Menambahkan setiap item sebagai elemen li ke dalam elemen ul
        items.forEach(function(item) {
            var li = document.createElement('li');
            li.textContent = item.trim();
			 li.style.textAlign = 'start'
            ul.appendChild(li);
        });
		
		ul.style.marginBottom = '0';
        
        // Menghapus konten asli dari elemen
        element.innerHTML = '';
        
        // Menambahkan elemen ul ke dalam elemen
        element.appendChild(ul);
    }
});




var elements = document.querySelectorAll('.portfolio_page_details_item_value');

// Loop melalui setiap elemen
elements.forEach(function(element) {
	
	if (element.textContent.trim() === "Occupied") {
        // Menambahkan properti CSS
        element.style.color = "red";
        element.style.fontWeight = "900";
	}
	if (element.textContent.trim() === "Available") {
        // Menambahkan properti CSS
        element.style.color = "green";
        element.style.fontWeight = "900";
	}
	
	// Jika teks elemen adalah "Contact Us"
	if (element.textContent === "Contact Us") {
		
		// Membuat elemen button baru
		var button = document.createElement('button');
		// Menyalin teks dari elemen span "Contact Us" ke dalam button
		button.innerHTML = element.innerHTML;
		// Menambahkan kelas yang sesuai untuk button
		button.classList.add('portfolio_page_details_item_value_button');
		// Mengganti elemen span "Contact Us" dengan button
		element.parentNode.replaceChild(button, element);
		button.addEventListener('click', function() {
			// Mengambil nama Suite A306-01 dari judul
			var suiteName = button.closest('.sc_blogger_item_body').querySelector('.sc_blogger_item_title a').innerText;
			// Buka halaman baru saat tombol ditekan
			window.open('https://wa.me/62081288935889?text=Halo%20Admin%20Aviso,%20saya%20tertarik%20dengan%20'+suiteName, '_blank');
		});
	}
});</script>
<!-- end Simple Custom CSS and JS -->
