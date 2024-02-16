function setter(){
    gsap.set(".span1,.span2,.span3,.span4",{y:"100%"})
    
    animateGreetingText()

}
function setImages(){
    
    setTimeout(()=>{
        // console.log("called/")
        gsap.set(".bottomImg1,.bottomImg2",{y:"100%"})
        gsap.set(".upperImg1,.upperImg2",{y:"0%"})
    },500)

}

function changeBtnColor(color){
    document.querySelector(".nextpageBtn").style.backgroundColor=color
}
function animateGreetingText(){
    // console.log("working")
let tl=gsap.timeline()
tl.to(".span1",{
    onStart:function(){
        changeBtnColor("green")
    },
    y:0,
    duration:1.4,
    stagger:2,
    color:"green",
    ease:Power2
})
tl.to(".span1",{
    y:-100,
    duration:1.5,
    stagger:2,
    ease:Power2
})
tl.to(".span2",{
    onStart:function(){
        changeBtnColor("blue")
    },
    y:0,
    duration:1,
    stagger:2,
    color:'blue',
    ease:Power2
})
tl.to(".span2",{
    
    y:-100,
    duration:1,
    stagger:2,
    ease:Power2
})
tl.to(".span3",{
    onStart:function(){
        changeBtnColor("red")
    },
    y:0,
    duration:1.4,
    stagger:2,
    color:"red",
    ease:Power2
})
tl.to(".span3",{
    y:-100,
    duration:1.5,
    stagger:2,
    color:"red",
    ease:Power2
})
tl.to(".span4",{
    onStart:function(){
        changeBtnColor("purple")
    },
    y:0,
    duration:1,
    stagger:2,
    color:"purple",
    ease:Power2
})
tl.to(".span4",{
    y:-100,
    duration:1,
    stagger:2,
    ease:Power2,
    onComplete:function(){

        setter()
    }
})
}
function animateScrollBtn(){
    gsap.to(".nextpageBtn",{
        y:20,
        duration:.8,
        yoyo:true,
        repeat:-1,
        ease:Power3
    })
}
function animateImages(){
    let tl=gsap.timeline()
    tl.to(".upperImg1,.rightImgFlex .upperImg1",{
        y:-150+"%",
        duration:1,
        delay:1,
        ease:Power3

    })
    tl.to(".rightImgFlex .upperImg1",{
        y:-150+"%",
        duration:1,
        stagger:.5,
        ease:Power3

    })
    tl.to(".upperImg2",{
        y:-200+"%",
        duration:1,
        delay:-1.2,
        ease:Power3

    })
    
    tl.to(".bottomImg1",{
        y:-130+"%",
        duration:1,
        delay:-1
        
    })
    tl.to(".bottomImg2",{
        y:-90+"%",
        duration:1
    ,delay:-1,
    // onComplete:function(){
    //     setImages()
    //     animateImages()
    // }
    })

    tl.to(".bottomImg1",{
        y:-900+"%",
        duration:2,
        delay:1
    })
    tl.to(".bottomImg2",{
        y:-500+"%",
        duration:2
    ,delay:-1,
    onComplete:function(){
        setImages()
        animateImages()
    }
    })
}

function animateSection2Images(){
    gsap.from(".sec2img1",{
        x:-100,
        duration:1,
        ease:Power2,  
          scrollTrigger:{
            trigger:".sec2img1",
            scroller:"body",
            scrub:1
    
        }
     
    })
    gsap.from(".sec2img2",{
        y:-100,
        duration:1,
        ease:Power2,  
          scrollTrigger:{
            trigger:".sec2img2",
            scroller:"body",
            scrub:1
    
        }
     
    })
    gsap.from(".sec2img3",{
        y:100,
        duration:1,
        ease:Power2,  
          scrollTrigger:{
            trigger:".sec2img3",
            scroller:"body",
            // markers:true,
            start:"top 90%",
            end:"bottom 80%",
            scrub:1
    
        }

    })
  gsap.from(".sec2img4",{
    scale:0.5,
    duration:1,
    delay:1,
    scrollTrigger:{
        trigger:".sec2img4",
            scroller:"body",
            scrub:true,
    }

  })
}
setter()
animateScrollBtn()
animateImages()
animateSection2Images()
