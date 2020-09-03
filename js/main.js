
window.addEventListener('DOMContentLoaded', function (){
    const bell = document.querySelector('.bell');
    const leftBox = document.querySelector('.left_box');
    const rightBox = document.querySelector('.right_box');
    const feed = document.querySelector('#contents_container');
    const txt = document.querySelector('#comment37');

    leftBox.style.right = `${innerWidth * 0.5 + 430}px`;
    rightBox.style.right = `${innerWidth * 0.5 + 90}px`;

    function notification() {
        this.classList.toggle('on'); //bell클래스에 on 추가 class = bell on이 됨, 클릭한 대상에게 this
    }

    function addMorePostAjax(data) {
        feed.insertAdjacentHTML('beforeend', data);
    }

    function callMorePostAjax(pageValue) {
        if(pageValue > 5) {
            return;
        }

        $.ajax({
            type:'POST',
            url:'data/post.html',
            data:pageValue,
            dataType: 'html',
            success:addMorePostAjax,
            error:function () {
                alert('문제가 발생했습니다.');
            }
        })

    }

    function scrollFunc() {
        //스크롤 최대 범위
        let documentHeight = document.body.scrollHeight;
        let scrollHeight = pageYOffset + window.innerHeight;

          if(pageYOffset >= documentHeight) {

              let pager = document.querySelector('#page');
              let pageValue = document.querySelector('#page').value;

              pager.value = parseInt(pageValue) + 1;

              callMorePostAjax(pageValue);

              if(pageValue > 5) {
                  return;
              }
          }
    }

    function resizeFunc() {
        leftBox.style.right = `${innerWidth * 0.5 + 430}px`;
        rightBox.style.right = `${innerWidth * 0.5 + 90}px`;
    }

    function delegation(e) {
        //타겟 : 클릭한 대상을 가져오기 e.target, e = 이벤트 객체
        let elem = e.target;
        while(!elem.getAttribute('data-name')){
            elem = elem.parentNode;
            if(elem.nodeName === 'BODY'){
                elem = null;
                return;
            }
        }
        if(elem.matches('[data-name="like"]')) {
            elem.classList.toggle('active');
            let pk = elem.getAttribute('data-name');
            $.ajax({
                type:'POST',
                url:'data/like.json',
                data:{pk},
                dataType:'json',
                success: function(response){
                    let likeCount = document.querySelector('#like-count-37');
                    likeCount.innerHTML =  response.like_count ;
                },
                error:function(request,status,error){
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com');
                }
            })
        }else if(elem.matches('[data-name="more"]')) {
            elem.classList.toggle('active');
        }else if(elem.matches('[data-name="send"]')) {
            $.ajax({
                type:'POST',
                url:'data/comment.html',
                data:'',
                dataType:'html',
                success:function(data){
                    document.querySelector('.comment_container').insertAdjacentHTML('beforeend',data);
                },
                error:function(request,status,error){
                    alert('문제가 발생했습니다.');
                }
            });
            txt.value = '';
        }else if(elem.matches('[data-name="delete"]')) {
            if(confirm('정말 삭제하시겠습니까?') === true){
                $.ajax({
                    type:'POST'
                    ,url:'data/delete.json'
                    ,data:''
                    ,dataType: 'json'
                    ,success:function (response) {
                        if(response.status){
                            let comt = document.querySelector('.comment-37');
                            comt.remove();
                        }
                    }
                    ,error:function () {

                    }

                })
            }
        }
    }

    bell.addEventListener('click', notification);
    feed.addEventListener('click', delegation);
    window.addEventListener('scroll', scrollFunc);
    window.addEventListener('resize', resizeFunc);

});
