(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = window.innerWidth-8,
    height = window.innerHeight-8;

canvas.width = width;
canvas.height = height;

// spring stuff
var tension = .025,
    dampening = .025,
    spread = .25;

// waves
var wavesNum = 100,
    waves = [],
    lastWave = new Date().getTime(),
    waveDelay = 500;

for(var i = 0; i < wavesNum; i++){
    var x =  Math.ceil(width/wavesNum)*i,
        y = height - (height/3)*2;

    waves.push({
            pos : {x : x, y : y},
            targetHeight : height-y,
            height : height-y,
            speed : 0
    });
}

function update(){
  // randomly make waves
  // if(new Date().getTime() > lastWave + waveDelay){
	// 	lastWave = new Date().getTime();
  //   waveDelay = Math.floor(Math.random()*1000);
  //   waves[Math.floor(Math.random()*wavesNum)].speed -= 20 + Math.random()*80;
  // }

  ctx.clearRect(0,0,canvas.width, canvas.height);

  for(var i = 0; i < wavesNum; i++){
    var diff = waves[i].targetHeight - waves[i].height;

    waves[i].speed += tension * diff - waves[i].speed * dampening;
    waves[i].height += waves[i].speed;
  }

  var lDeltas = [],
      rDeltas = [];

  for (var i = 0; i < wavesNum; i++){
    if (i > 0){
      lDeltas[i] = spread * (waves[i].height - waves[i - 1].height);
      waves[i - 1].speed += lDeltas[i];
    }

    if (i < wavesNum - 1){
      rDeltas[i] = spread * (waves[i].height - waves[i + 1].height);
      waves[i + 1].speed += rDeltas[i];
    }
  }

  for (var i = 0; i < wavesNum; i++){
    if (i > 0){
      waves[i - 1].height += lDeltas[i];
    }
    if (i < waves.length - 1){
      waves[i + 1].height += rDeltas[i];
    }

    // draw the wave
    waves[i].pos.y = height - waves[i].height;
    if(i < wavesNum-1){
      var grad = ctx.createLinearGradient(waves[i].pos.x,waves[i].pos.y,waves[i+1].pos.x,height);
      grad.addColorStop(0, 'rgb(0,100,200)');
      grad.addColorStop(1, 'rgb(0,0,100)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.lineTo(waves[i].pos.x, waves[i].pos.y);
      ctx.lineTo(waves[i+1].pos.x, waves[i].pos.y);
      ctx.lineTo(waves[i+1].pos.x, height);
      ctx.lineTo(waves[i].pos.x, height);
      ctx.fill();
    }
  }

  requestAnimationFrame(update);
}
waves[Math.floor(Math.random()*wavesNum)].speed = 20;
update();

canvas.addEventListener('click', function(e){
    // get the area we clicked
    $(document).on('click', 'body', function () {
      console.log(`Client x`, e.clientX);
      socket.emit('click', e.xlientX);

    });
    var wave = Math.floor(e.clientX/(width/wavesNum));
    waves[wave].speed -= Math.random()*160;

});
