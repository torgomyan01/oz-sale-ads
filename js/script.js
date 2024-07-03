const url = new URL(window.location);
const img_link = url.searchParams.get("image_link");
const title = url.searchParams.get("title").slice(0, 90);
const price = url.searchParams.get("price");
const old_price = url.searchParams.get("old_price");
const code = url.searchParams.get("code");


// if(!img_link || !title || !price || !old_price || !code){
//   alert('Տվյալները ամբողջովին հասանելի չեն հնարաոր է չստացվի');
// }

$('.product-title').text(title)
$('.product-price').text(price)
$('.product-sale-price').text(old_price)
$('.product-code span').text(code)
$('.product-product').attr('src', img_link)


const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))


$(window).on('load', function (){
  const imageUrl = $('.product-product').attr('src');

    toDataURL(imageUrl)
      .then(dataUrl => {
        $('.product-product').attr('src', dataUrl)
      })
})




$('#save-image').on('click', function () {


  view = window.open("", "view")
  view.document.open()
  view.document.write(`
                <link rel="stylesheet" href="css/style.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
                <script src="js/jquery-3.4.1.min.js"></script>
                <script src="js/html2canvas.min.js"></script>
            `)
  view.document.write(document.getElementById('product').outerHTML + '<a href="" id="img-link"></a>')
  view.document.write(`
                <script>
                    html2canvas(document.querySelector('#product')).then(canvas => {
                        canvas.id = 'canv-is-dis-none';
                        document.body.appendChild(canvas);
                    });
                    setTimeout(()=>{
                        let canvas = document.getElementById('canv-is-dis-none')
                        var link = document.getElementById('img-link');
                        link.setAttribute('download', 'MintyPaper.png');
                        link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'imageoctet-stream'));
                        link.click();
                    },1000)
                </script>
                <style>
                    #canv-is-dis-none{
                        display: none;
                    }
                </style>
            `)
  view.document.close()

})