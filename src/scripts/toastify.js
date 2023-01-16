export function toast(text, color){
    Toastify({
        text: text,
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color
        },
      }).showToast();
}
