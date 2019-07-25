$(document).ready(function(){
    responsive();
    setInterval(responsive,1);
    $(window).resize(function(){
        responsive();
    })
    function responsive(){
        var hheight=$(".header").outerHeight()
        $(".sidebar").css({
            "height":$(window).innerHeight()-hheight,
            "top":hheight
        })
        $(".content").css({
            "margin-top":hheight
        })
        let condition=$(".header-menu>div:first-child").css("display");
        if(condition==="block"){
            $(".sidebar").hide();
        }
        $(".loginpanel").css({
            "height":$(window).innerHeight(),
            "overflow":"auto"
        })

    }
    $(document).on("click",function(e){
        if(e.target.matches(".fa-bars")){
            $(".sidebar").toggle();
        }
        else{
            $(".sidebar").hide();
        }
    })
})