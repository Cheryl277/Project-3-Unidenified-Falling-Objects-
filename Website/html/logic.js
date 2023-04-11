var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
        return document.querySelector(s);
    },
    selectAll = function (s) {
        return document.querySelectorAll(s);
    },
    ring = select('.ring'),
    highlight = select('.highlight'),
    cowHighlight = select('.cowHighlight'),
    mountainShine = select('.mountainShine'),
    beep = select('.beep'),
    beam = select('.beam'),
    allMountains = selectAll('.mountainGroup g'),
    allParallax = selectAll('.parallax'),
    beamPoints = beam.getAttribute('points').split(' ').map(x => Number(x)),
    starContainer = select('.starContainer'),
    ringContainer = select('.ringContainer'),
    dragger = select('.dragger'),
    ufo = select('.ufo'),
    cowMaskGroup = select('.cowMaskGroup'),
    cow = select('.cow'),
    cowShadow = select('.cowShadow'),
    ufoGroup = select('.ufoGroup'),
    aerialGroup = select('.aerialGroup'),
    maxDrag = 500,
    step = maxDrag / 10,
    friction = 0.59,
    spring = 0.1,
    rx = 0,
    speed = 0,
    aerialSpeed = 0,
    vx = 0,
    isDragging = false,
    isBeeping = false,
    starColorsArray = ['#737CB7', '#ededed', '#CB83C6', '#DED7DE', '#EAC0B0'],
    mouseTimer = 0,
    mouseTimerTween,
    myDraggable


TweenMax.set('svg', {
    visibility: 'visible'
})

TweenMax.set([highlight, cowHighlight, beam, ufoGroup], {
    transformOrigin: '50% 0%'
})

TweenMax.set([cow, cowMaskGroup, cowShadow], {
    transformOrigin: '50% 50%'
})

TweenMax.set(aerialGroup, {
    transformOrigin: '50% 100%'
})



function moveUI(vx) {
    //console.log(vx)
    TweenMax.staggerTo(allParallax, 0.31, {
        cycle: {
            x: function (i) {
                //var step = 1 / allMountains.length;
                //var ratio = parallaxEase.getRatio((i/allMountains.length) + step);
                //console.log()
                return -(dragger._gsTransform.x / 7) / ((allParallax.length) - i)
            }
        },
        ease: Sine.easeOut
    }, 0)
    //console.log(ufoGroup._gsTransform.rotation)
    TweenMax.to([highlight], 0.1, {
        x: ufo._gsTransform.x,
        ease: Power3.easeOut
    })
    TweenMax.to(cowHighlight, 0.1, {
        x: ufo._gsTransform.x - dragger._gsTransform.x,
        ease: Power3.easeOut
    })
    TweenMax.set([cowMaskGroup, cow, cowShadow], {
        x: dragger._gsTransform.x - vx
    })

}

function onPress() {
    makeBeep()
    isDragging = true;
    mouseTimerTween = TweenMax.to({}, 9999999, {
        onUpdate: function () {
            if (this.time() > 5) {
                makeBeep();
                mouseTimerTween.kill();

                abductCow();
            }
        }
    })
}

function onRelease() {

    isDragging = false;

    mouseTimer = mouseTimerTween.time();
    mouseTimerTween.kill();
}

function abductCow() {
    myDraggable[0].disable();
    isDragging = false;
    var tl = new TimelineMax({ onComplete: resetCow });
    tl.to([cow, cowMaskGroup], 4, {
        y: -120,
        scale: 0,
        ease: Expo.easeIn

    })
        .to(cowShadow, 4, {
            scaleY: 30,
            scaleX: 3,
            alpha: 0,
            ease: Expo.easeIn
        }, '-=4')
        .to(beam, 1, {
            scaleX: 0,
            ease: Expo.easeIn
        }, '-=1')
        .to(highlight, 1, {
            alpha: 0,
            ease: Expo.easeIn
        }, '-=1')

}

function resetCow() {

    var tl = new TimelineMax({ delay: 2, onComplete: function () { myDraggable[0].enable() } });
    tl.to([cow, cowShadow, cowMaskGroup], 0.6, {
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        x: 0,
        y: 0,
        rotation: '+=360'
    })
        .to(beam, 0.6, {
            alpha: 0.3,
            scale: 1
        }, '-=0.6')

        .to(highlight, 0.6, {
            alpha: 1
        }, '-=0.6')

        ;
}

function init() {

    TweenMax.to(ufo, 10, {
        x: '+=0',
        repeat: -1,
        modifiers: {
            x: function (x, target) {
                vx += (dragger._gsTransform.x - ufo._gsTransform.x) * spring;
                vx *= friction;
                moveUI(vx, target);
                return ufo._gsTransform.x + vx;
            }
        }
    })

    TweenMax.to(ufoGroup, 1, {
        rotation: '+=0',
        repeat: -1,
        modifiers: {
            rotation: function (rotation, count) {
                speed += (dragger._gsTransform.x - ufo._gsTransform.x) * spring;
                speed *= friction;
                //console.log(speed)
                /* if(Math.abs(speed) > 23){
                 makeBeep()
                } */
                return rotation + speed
            }
        }
    })

    TweenMax.to(ufo, 1, {
        y: 20,
        repeat: -1,
        ease: Sine.easeInOut,
        yoyoEase: Sine.easeInOut
    })

    TweenMax.to(highlight, 1, {
        scale: 1.5,
        repeat: -1,
        ease: Sine.easeInOut,
        yoyoEase: Sine.easeInOut
    })

    /* TweenMax.to(beam, 1, {
     scaleX:1.2,
     repeat:-1,
     ease:Sine.easeInOut,
     yoyoEase:Sine.easeInOut
    })
     */
    TweenMax.to(aerialGroup, 1, {
        rotation: '+=0',
        repeat: -1,
        modifiers: {
            rotation: function (rotation, count) {
                aerialSpeed += -(dragger._gsTransform.x - ufo._gsTransform.x) * 0.3;
                aerialSpeed *= 0.61;
                return rotation + aerialSpeed
            }
        }
    })



    myDraggable = Draggable.create(dragger, {
        //trigger:ufo,
        type: 'x',
        bounds: { minX: 0, maxX: maxDrag },
        throwProps: true,
        //cursor:'auto',
        /*  liveSnap:function(value){
          return Math.round(value / step) * step;
         }, */
        onPress: onPress,
        onRelease: onRelease,
        onThrowComplete: function () { isDragging = false },
        overshootTolerance: 0
    })

}
function makeBeep() {
    //if(isBeeping){return};
    var clone = beep.cloneNode(true);
    aerialGroup.appendChild(clone);
    TweenMax.fromTo(clone, 0.6, {
        attr: {
            r: 2
        },
        strokeWidth: 10
    }, {
        attr: {
            r: 30
        },
        strokeWidth: 0,
        onComplete: removeRing,
        onCompleteParams: [clone, true],
        onStart: function () { isBeeping = true; }
    })

}

function makeRing() {
    TweenMax.delayedCall(0.3, makeRing);
    if (!isDragging) { return };
    var clone = ring.cloneNode(true);
    ringContainer.appendChild(clone);
    TweenMax.fromTo(clone, 0.5, {
        x: ufo._gsTransform.x,
        y: ufo._gsTransform.y + 70,
        attr: {
            rx: 16,
            ry: 4
        },
        strokeWidth: 5
    }, {
        x: dragger._gsTransform.x,
        y: 200,
        alpha: 0,
        attr: {
            rx: 50,
            ry: 10
        },
        strokeWidth: 0,
        onComplete: removeRing,
        onCompleteParams: [clone],
        ease: Linear.easeNone
    })


}

function removeRing(ring, isBeep) {

    if (isBeep) { isBeeping = false; }
    ring.parentNode.removeChild(ring);
}

function makeStars() {

    for (var i = 0; i < 150; i++) {
        var star = document.createElementNS(xmlns, 'circle');
        starContainer.appendChild(star);

        TweenMax.set(star, {
            fill: starColorsArray[i % starColorsArray.length],
            alpha: randomBetween(1, 8) / 10,
            attr: {
                r: randomBetween(1, 8) / 10,
                cx: randomBetween(0, 800),
                cy: randomBetween(0, 435)
            }
        })
    }
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

makeRing();
makeStars();

function intro() {
    TweenMax.staggerFrom('.ufoLightGroup circle', 0.8, {
        fillOpacity: "0",
        repeat: -1,
        yoyoEase: Sine.easeOut
    }, 0.3)


    var tl = new TimelineMax({});
    tl.from(ufo, 2, {
        scale: 0,
        x: 100,
        rotation: 43,
    })
        .from(ufo, 3, {
            y: 200,
            ease: Elastic.easeOut.config(1, 0.7)
        }, '-=2')
        .from(beam, 1, {
            scaleX: 0,
            ease: Expo.easeInOut
        }, '-=0')
        .from([highlight, cowHighlight], 1, {
            scale: 0,
            ease: Expo.easeInOut
        }, '-=1')
        .addCallback(init)
}

//init();
intro()