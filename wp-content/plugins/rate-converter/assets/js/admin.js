/**
 * Rate Convert Admin JavaScript
 * Version: 1.0.1
 * Last Updated: <?php echo date('Y-m-d H:i:s'); ?>
 */

jQuery(document).ready(function($) {
    
    // Media Uploader - Single instance for both add and edit pages
    var mediaUploader = null;
    
    // Initialize media uploader when the button is clicked
    $(document).on('click', '.upload-image-button', function(e) {
        e.preventDefault();
        
        var button = $(this);
        var imageField = button.prev('.image-field');
        var previewImage = button.next('.preview-image');
        var currentImage = imageField.val();
        
        // Create new media uploader instance
        var mediaUploader = wp.media({
            title: 'Select Image',
            button: {
                text: 'Use this image'
            },
            multiple: false,
            library: {
                type: 'image'
            }
        });
        
        // When the frame is opened, select the current image if exists
        mediaUploader.on('open', function() {
            if (currentImage) {
                var selection = mediaUploader.state().get('selection');
                var query = wp.media.query({
                    type: 'image'
                });
                
                query.more().done(function() {
                    // Find the attachment with matching URL
                    var attachment = query.find(function(attachment) {
                        return attachment.get('url') === currentImage;
                    });
                    
                    if (attachment) {
                        selection.add(attachment);
                    }
                });
            }
        });
        
        // When an image is selected, run a callback
        mediaUploader.on('select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            imageField.val(attachment.url);
            previewImage.attr('src', attachment.url).show();
        });
        
        // Open the uploader dialog
        mediaUploader.open();
    });
    
    // Add New Item
    $('#add-rate-convert-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var submitButton = form.find('button[type="submit"]');
        
        // Get all form values
        var formData = {
            name: $('#name').val().trim(),
            image: $('#image').val().trim(),
            min_price: $('#min-price').val().trim(),
            max_price: $('#max-price').val().trim(),
            rate_convert: $('#rate-convert').val().trim()
        };
        
        // Basic validation
        if (!formData.name) {
            alert('Name is required');
            return false;
        }
        if (!formData.image) {
            alert('Image is required');
            return false;
        }
        
        // Convert to numbers and validate
        formData.min_price = parseFloat(formData.min_price);
        formData.max_price = parseFloat(formData.max_price);
        formData.rate_convert = parseFloat(formData.rate_convert);
        
        if (isNaN(formData.min_price) || formData.min_price <= 0) {
            alert('Minimum price must be greater than zero');
            return false;
        }
        if (isNaN(formData.max_price) || formData.max_price <= 0) {
            alert('Maximum price must be greater than zero');
            return false;
        }
        if (isNaN(formData.rate_convert) || formData.rate_convert <= 0) {
            alert('Rate convert must be greater than zero');
            return false;
        }
        if (formData.min_price >= formData.max_price) {
            alert('Minimum price must be less than maximum price');
            return false;
        }
        
        submitButton.prop('disabled', true).text('Saving...');
        
        // Prepare AJAX data
        var ajaxData = {
            action: 'rate_convert_add',
            nonce: rate_convert_vars.nonce,
            name: formData.name,
            image: formData.image,
            min_price: formData.min_price,
            max_price: formData.max_price,
            rate_convert: formData.rate_convert
        };
        
        $.ajax({
            type: 'POST',
            url: rate_convert_vars.ajax_url,
            data: ajaxData,
            success: function(response) {
                if (response.success) {
                    alert(response.data.message || 'Item added successfully!');
                    window.location.href = 'admin.php?page=rate-convert';
                } else {
                    alert('Error: ' + (response.data || 'Failed to add rate convert'));
                }
            },
            error: function(xhr, status, error) {
                alert('Server error. Please check console for details.');
            },
            complete: function() {
                submitButton.prop('disabled', false).text('Add Rate Convert');
            }
        });
    });
    
    // Edit Item
    $('#edit-rate-convert-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var submitButton = form.find('button[type="submit"]');
        
        // Validasi input sebelum submit
        var minPrice = parseFloat($('#edit-min-price').val());
        var maxPrice = parseFloat($('#edit-max-price').val());
        
        if (minPrice >= maxPrice) {
            alert('Minimum price must be less than maximum price');
            return false;
        }
        
        submitButton.prop('disabled', true).text('Updating...');
        
        $.ajax({
            type: 'POST',
            url: rate_convert_vars.ajax_url,
            data: {
                action: 'rate_convert_update',
                nonce: rate_convert_vars.nonce,
                id: $('#edit-id').val(),
                name: $('#edit-name').val(),
                image: $('#edit-image').val(),
                min_price: minPrice,
                max_price: maxPrice,
                rate_convert: parseFloat($('#edit-rate-convert').val())
            },
            success: function(response) {
                if (response.success) {
                    alert('Item updated successfully!');
                    window.location.href = 'admin.php?page=rate-convert';
                } else {
                    alert('Error: ' + response.data);
                }
            },
            error: function(xhr, status, error) {
                console.error('Update error:', {
                    status: status,
                    error: error,
                    response: xhr.responseText
                });
                alert('Server error. Please check console for details.');
            },
            complete: function() {
                submitButton.prop('disabled', false).text('Update Rate Convert');
            }
        });
    });
    
    // Delete Item
    $(document).on('click', '.delete-item', function() {
        if (!confirm('Are you sure you want to delete this item?')) {
            return false;
        }
        
        var button = $(this);
        var id = button.data('id');
        button.prop('disabled', true).text('Deleting...');
        
        $.ajax({
            type: 'POST',
            url: rate_convert_vars.ajax_url,
            data: {
                action: 'rate_convert_delete',
                nonce: rate_convert_vars.nonce,
                id: id
            },
            success: function(response) {
                if (response.success) {
                    $('#rate-item-' + id).fadeOut('fast', function() {
                        $(this).remove();
                    });
                    alert('Item deleted successfully!');
                } else {
                    alert('Error: ' + response.data);
                    button.prop('disabled', false).text('Delete');
                }
            },
            error: function() {
                alert('Server error. Please try again.');
                button.prop('disabled', false).text('Delete');
            }
        });
    });

    // Helper function untuk format angka
    function numberFormat(number) {
        return new Intl.NumberFormat('id-ID').format(number);
    }

    // Helper function untuk format rate
    function formatRate(rate) {
        rate = parseFloat(rate);
        if (Number.isInteger(rate)) {
            return rate.toString();
        }
        return rate.toString().replace(/\.?0+$/, '');
    }
}); 