window.addEventListener('DOMContentLoaded', function () {
    //lable 태그를 선택하면 input태그를 선택한 것과 동일함 (input > lable일 때)
    const fileInput = document.querySelector('#id_photo');
    const submit = document.querySelector('#submitBtn');
    const canvas = document.querySelector('#imageCanvas');
    let ctx = canvas.getContext('2d'); //캔버스를 그리려면 컨택스트가 필요함

    function handleImage(){
        let fileList = fileInput.files; //fileInput에서 가져오는 파일들을 담음
        let reader = new FileReader();

        submit.disabled = false;  //change가 일어났을 때
        reader.readAsDataURL(fileList[0]);

        reader.onload = function (event){
           let img = new Image();
           img.onload = function (){
                canvas.width = 100;
                canvas.height = 100;
                ctx.drawImage(img, 0,0,100,100);

                submit.parentNode.style.display = 'block';
           };
           img.src = event.target.result; //dataURL로 가져왔던 긴 URL을 img src 경로로 넣기
            //console.log(img.src);
        };
        //console.log(fileList);
    }

    fileInput.addEventListener('change', handleImage);
});