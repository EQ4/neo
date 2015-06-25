/**   _   _____ _   _   
*    | | |_   _| |_| |
*    | |_ _| | |  _  |
*    |___|_|_| |_| |_| 2015
*    @author lo.th / http://lo-th.github.io/labs/
*/

'use strict';

var UIL;

var NEO = NEO || ( function () {

    

    return {
        main:null,
        REVISION: '0.1',
        DEF:false,
        events:[ 'onkeyup', 'onkeydown', 'onclick', 'onchange', 'onmouseover', 'onmouseout', 'onmousemove', 'onmousedown', 'onmouseup', 'onmousewheel' ],
        WIDTH:300,
        BW:190,
        AW:100, 
        svgns:"http://www.w3.org/2000/svg",
        sizer:function(w){
            this.WIDTH = w.toFixed(0);
            var s = this.WIDTH/3;
            this.BW = (s*2)-10;
            this.AW = s;

            if(this.main) this.main.changeWidth();
        },
        classDefine:function(){
            NEO.COLOR = 'N';
            //NEO.SELECT = '#035fcf';
            //NEO.SELECTDOWN = '#024699';
            //NEO.SVGB = 'rgba(0,0,0,0.2)';
            //NEO.SVGC = 'rgba(120,120,120,0.6)';
            NEO.txt1 = 'font-family:"Open Sans", sans-serif; font-size:11px; color:#cccccc; outline:0; padding:0px 10px; left:0; top:1px; height:17px; width:100px; overflow:hidden;';

            NEO.CC('NEO', 'position:absolute; pointer-events:none; box-sizing:border-box; -o-user-select:none; -ms-user-select:none; -khtml-user-select:none; -webkit-user-select:none; -moz-user-select:none; margin:0; padding:0; ');

            NEO.CC('NEO.content', 'width:100%; overflow:hidden;  background:none;');

            
            NEO.CC('NEO.topmenu', 'width:100%; height:19px; background:none; ');
            NEO.CC('NEO.timeBar', 'width:100%; height:32px; top:18px; background:none; pointer-events:auto; cursor:pointer;');
            NEO.CC('NEO.timescale', 'width:100%; height:18px; background:#0FF; bottom:0;');
            NEO.CC('NEO.inner', 'width:100%; top:50px; height:auto; overflow:hidden; background:#FFF;');

            /*NEO.CC('NEO.mask', 'width:400px; height:100%; margin-left:-50px; pointer-events:auto; cursor:col-resize; background:none; display:none;');
            NEO.CC('NEO.inner', 'width:300px; top:0; left:0; height:auto; overflow:hidden; background:none;');

            NEO.CC('NEO.base', 'position:relative; transition:height, 0.1s ease-out; height:20px; border-bottom:1px groove rgba(0,0,0,0.2); overflow:hidden;');

            NEO.CC('NEO.text', NEO.txt1);

            NEO.CC('input', 'border:solid 1px rgba(0,0,0,0.2); background:rgba(0,0,0,0.2); transition: 0.1s ease-out;', true);
            NEO.CC('input:focus', 'border: solid 1px rgba(0,0,0,0); background:rgba(0,0,0,0.6);', true);

            NEO.CC('NEO.list', 'box-sizing:content-box; border:20px solid transparent; border-bottom:10px solid transparent; left:80px; top:0px; width:190px; height:90px; overflow:hidden; cursor:s-resize; pointer-events:auto; display:none;');
            NEO.CC('NEO.list-in', 'left:0; top:0; width:100%; background:rgba(0,0,0,0.2); ');
            NEO.CC('NEO.listItem', 'position:relative; height:18px; background:rgba(0,0,0,0.2); border-bottom:1px solid rgba(0,0,0,0.2); pointer-events:auto; cursor:pointer;'+NEO.txt1);
            NEO.CC('NEO.listItem:hover', 'background:'+NEO.SELECT+'; color:#FFFFFF;')

            NEO.CC('NEO.scroll-bg', 'cursor:w-resize; pointer-events:auto; background:rgba(256,0,0,0.2);');
            NEO.CC('NEO.svgbox', 'left:100px; top:1px; width:190px; height:17px; pointer-events:auto; cursor:pointer; font-family:"Open Sans", sans-serif; font-size:11px; text-align:center;');*/

            NEO.DEF = true;
        },
        bgcolor: function(p, a){
            var r=48, g=48, b=48;
            a = a || 0.66;
            if(p){
                switch(p){
                    case 'r': case 'R': case 'S': r=160; b=68; break;
                    case 'g': case 'G': case 'E': g=120; b=68; break;
                    case 'b': case 'B': case 'T': b=120; g=68; break;
                    case 'no': case 'NO': a=0; break;
                }
            }
            return 'rgba('+r+','+g+','+b+','+a+')';
        },
        /*canvasURL:function(obj){
            var canvas = document.createElement( 'canvas' );
            canvas.width = obj.w || 20;
            canvas.height = obj.h || 20;

            var context = canvas.getContext( '2d' );
            context.fillStyle = '#444';
            context.fillRect( 0, 0, 20, 20 );
            return canvas.toDataURL();
        },*/
        setSVG:function(dom, type, value, id){
            dom.childNodes[id || 0].setAttributeNS(null, type, value );
        },
        setDOM:function(dom, type, value){
            dom.style[type] = value+'px';
        },

        DOM:function(cc, type, css, obj, dom, id){ 
            type = type || 'div';
            if(type=='rect' || type=='path' || type=='polygon' || type=='text' || type=='pattern' || type=='defs' || type=='g' || type=='line' ){
                if(dom==undefined) dom = document.createElementNS( this.svgns, 'svg' );
                var g = document.createElementNS( this.svgns, type );

                for(var e in obj){
                    if(e=='txt') g.textContent = obj[e];
                    else g.setAttributeNS(null, e, obj[e] );
                }

                if(id==undefined) dom.appendChild(g);
                else dom.childNodes[id || 0].appendChild(g);

                if(cc) dom.setAttribute('class', cc);
            } else {
                if(dom==undefined) dom = document.createElement(type);
                if(cc) dom.className = cc;
            }
            
            if(css) dom.style.cssText = css; 


            if(id==undefined) return dom;
            else return dom.childNodes[id || 0];
        },
        CC:function(name,rules,noAdd){
            var adds = '.';
            if(noAdd)adds='';
            if(name == '*') adds = '';
            var style = document.createElement('style');
            style.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(style);
            if(!(style.sheet||{}).insertRule) (style.styleSheet || style.sheet).addRule(adds+name, rules);
            else style.sheet.insertRule(adds+name+"{"+rules+"}",0);
        }
    };

})();


NEO.Timeline = function(css, decal){

    NEO.main = this;

    this.frame = 0;
    this.fps = 30;
    this.time = 0;
    this.height = 30;
    this.framesize = 10;
    this.timerdown = false;
    this.inPlay = false;


    this.neo = [];
    this.f = [];

    this.content = NEO.DOM('NEO content', 'div', css);
    document.body.appendChild(this.content);

    this.top = parseFloat(this.content.style.top.substring(0,this.content.style.top.length-2));


    this.topmenu = NEO.DOM('NEO topmenu');
    //this.content.appendChild(this.topmenu);

    var callbackSize = function(v){ this.scaletime(v); }.bind(this);
    var callbackFps = function(v){ this.fps = v; this.updateTime(); }.bind(this);
    var callbackList = function(v){ this.add(v); this.addList.text('ADD'); }.bind(this);
    var callbackPlay = function(v){ this.play(); }.bind(this);

   
    this.sizer = new UIL.Slide({target:this.topmenu, callback:callbackSize, name:'scale', min:0.1, max:4, value:0.8, step:0.1, color:'no', size:150, pos:{left:'auto', right:'0'}});
    this.setFps = new UIL.Number({target:this.topmenu, callback:callbackFps, name:'fps', min:12, max:60, value:60, step:1, color:'no', size:82, solo:true, pos:{left:'auto', right:'130px'}});
    this.title = new UIL.Title({target:this.topmenu, name:'0:00:00', color:'no', size:120, height:20, pos:{} });
    this.addList = new UIL.List({target:this.topmenu, callback:callbackList, name:' ', color:'no', list:['bang', 'flag', 'curve', 'lfo', 'color', 'switch', 'audio', 'video'], size:150, pos:{left:'60px'} });
    this.addList.text('ADD');

    this.playButton = new UIL.Button({target:this.topmenu, callback:callbackPlay, name:'X', color:'no', size:41, pos:{left:'200px'} });
    this.playIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'><path fill='#CCC' d='M 12 9 L 12 7 5 3 4 4 4 12 5 13 12 9 Z'/></svg>";
    this.pauseIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'><path fill='#CCC' d='M 12 3 L 9 3 9 13 12 13 12 3 M 7 3 L 4 3 4 13 7 13 7 3 Z'/></svg>";
    this.playButton.icon(this.playIcon);

    //this.pauseButton = new UIL.Button({target:this.topmenu, callback:callbackPause, name:'X', color:'no', size:41, pos:{left:'220px'} });
    //this.pauseButton.icon("<svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px'><path fill='#CCC' d='M 12 3 L 9 3 9 13 12 13 12 3 M 7 3 L 4 3 4 13 7 13 7 3 Z'/></svg>");

    


    this.timeBar = NEO.DOM('NEO timeBar');
    this.content.appendChild(this.timeBar);
    this.timeBar.name = 'timeBar';


    // special svg pattern
    this.pattern = NEO.DOM('NEO', 'defs', 'width:100%; height:20px; bottom:0;', {} );
    var p = NEO.DOM(null, 'pattern', '', {id:'timeBar', width:50, height:20, patternUnits:'userSpaceOnUse'}, this.pattern, 0 );
    var g = NEO.DOM(null, 'g', '', { stroke:'#888', 'stroke-width':'1', fill:'none'}, p, 0 );
    NEO.DOM(null, 'path', '', { d:'M0.5 10 L0.5 18'}, g, 0 );
    NEO.DOM(null, 'path', '', { d:'M10.5 15 L10.5 18'}, g, 0 );
    NEO.DOM(null, 'path', '', { d:'M20.5 15 L20.5 18'}, g, 0 );
    NEO.DOM(null, 'path', '', { d:'M30.5 15 L30.5 18'}, g, 0 );
    NEO.DOM(null, 'path', '', { d:'M40.5 15 L40.5 18'}, g, 0 );
    NEO.DOM(null, 'path', '', { d:'M-0.5 20 L50.5 20'}, g, 0 );
    NEO.DOM(null, 'rect', '', {width:100, height:20, x:0, fill:'url(#timeBar)'}, this.pattern );

    this.patternLine = g.childNodes[0];

    this.timeBar.appendChild(this.pattern);

    this.timescale = NEO.DOM('NEO timescale');
    this.content.appendChild(this.timescale);

    this.inner = NEO.DOM('NEO inner');
    this.content.appendChild(this.inner);

    this.marker = NEO.DOM('NEO', 'rect', 'width:41px; height:100%;', {width:10, height:20, x:0.5, y:27.5, fill:'rgba(255,0,0,0.3)', stroke:'#F00', 'stroke-width':'1'} );
    NEO.DOM(null, 'line', '', { x1:5.5, y1:47.5, x2:5.5, y2:1000, stroke:'#F00', 'stroke-width':'1' }, this.marker );
    //NEO.DOM(null, 'path', '', { d:'M5.5 47.5 L5.5 1000', stroke:'#F00', 'stroke-width':'1' }, this.marker );
    this.content.appendChild(this.marker);

    this.content.appendChild(this.topmenu);


    this.f[0] = function(e){
        if(e.target.name){
            if(e.target.name=='timeBar'){
                this.timerdown = true;
                this.f[1](e);
            }
        }
    }.bind(this);

    this.f[1] = function(e){
        if(!this.timerdown) return;
        var x = e.clientX;
        this.frame = Math.floor(x/this.framesize);
        this.marker.style.left = (this.frame*this.framesize)+'px';
        this.updateTime();
    }.bind(this);

    this.f[2] = function(e){
        this.timerdown = false;
    }.bind(this);

    this.content.onmousedown = this.f[0];
    this.content.onmousemove = this.f[1];
    this.content.onmouseout = this.f[2];
    this.content.onmouseup = this.f[2];



    this.scaletime(0.8);//default FLASH
    //this.scaletime(1);

    this.title.text2(this.frame);

    window.addEventListener("resize", function(e){this.resize(e)}.bind(this), false );
    this.resize();
}


NEO.Timeline.prototype = {
    constructor: NEO.Timeline,
    play:function(){
        if(this.inPlay){
            this.inPlay = false;
            this.playButton.icon(this.playIcon);
        }else{
            this.inPlay = true;
            this.playButton.icon(this.pauseIcon);
            
        }

    },
    show:function(){
        this.content.style.display = 'block';
    },
    hide:function(){
        this.content.style.display = 'none';
    },
    scaletime:function(s){
        //var scale = 'scale('+s+',1)';
        var w = 100 * (100/(100*s));

        this.framesize = (s*10).toFixed(0)*1;
        //console.log(w, this.framesize );

        var ld = (this.framesize*0.5)+0.5;

        NEO.setSVG(this.pattern, 'width', 100+'%', 1);

        var n = [
            Math.round(this.framesize)+0.5,
            Math.round(this.framesize*2)+0.5,
            Math.round(this.framesize*3)+0.5,
            Math.round(this.framesize*4)+0.5,
            Math.round(this.framesize*5)+0.5,
        ];

        NEO.setSVG(this.patternLine, 'd', 'M'+n[0]+' 15 L'+n[0]+' 18', 1);
        NEO.setSVG(this.patternLine, 'd', 'M'+n[1]+' 15 L'+n[1]+' 18', 2);
        NEO.setSVG(this.patternLine, 'd', 'M'+n[2]+' 15 L'+n[2]+' 18', 3);
        NEO.setSVG(this.patternLine, 'd', 'M'+n[3]+' 15 L'+n[3]+' 18', 4);
        NEO.setSVG(this.patternLine, 'd', 'M-0.5 20 L'+n[4]+' 20', 5);

        NEO.setSVG(this.pattern.childNodes[0], 'width', this.framesize*5, 0);

        NEO.setSVG(this.marker, 'width',this.framesize);
        NEO.setSVG(this.marker, 'x1',ld, 1);
        NEO.setSVG(this.marker, 'x2',ld, 1);

        this.marker.style.left = (this.frame*this.framesize)+'px';

    },
    add:function(type, obj){
        var n;
        /*switch(type){
            case 'bang':  n = new NEO.Bang(obj); break;
            case 'color': n = new NEO.Color(obj); break;
            case 'curve': n = new NEO.Curve(obj); break;
            case 'flag':  n = new NEO.Flag(obj);  break;
            case 'lfo':   n = new NEO.Lfo(obj);  break;
            case 'switch':  n = new NEO.Switch(obj);  break;
            case 'audio':   n = new NEO.AudioTrack(obj);   break;
            case 'video':   n = new NEO.VideoTrack(obj);   break;
        }
        this.neo.push(n);*/
        //this.calc();

        console.log(type);
        return n;
    },
    resize:function(e){
        this.width = window.innerWidth;
        this.height = window.innerHeight-this.top-5;
        this.content.style.height = this.height+'px';

        //this.sizer.setDom(0,'left', this.width-140 );
        //this.zone = this.height-40;
        //this.calc();
        //this.f[5](0);
    },
    updateTime:function () {
        this.time = this.frame/this.fps;

        var minutes = Math.floor( this.time / 60 );
        var seconds = this.time % 60;
        var padding = seconds < 10 ? '0' : '';

        this.title.text2(this.frame);
        this.title.text( minutes + ':' + padding + seconds.toFixed( 2 ) );
    }
}



NEO.classDefine();