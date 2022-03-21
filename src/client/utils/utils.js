export function formatMoney(price, currency, locale) {
    const formatter = new Intl.NumberFormat(locale || 'en-us', {
        style: 'currency',
        currency: currency || 'USD',
      });
      
    return formatter.format(price);
}

export function debounce(fn, wait) {
    let callback = fn;    
    let timerId = null;

    function debounced() {
        let context = this;
        let args = arguments;        

        clearTimeout(timerId);        
        timerId = setTimeout(function() {            
            callback.apply(context, args);
        }, wait);
    }
    
    return debounced;         
}