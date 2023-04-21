let video = document.getElementById("video");
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d",{ willReadFrequently: true });

let delta = 5;
let slider = document.getElementById("visibility");
slider.oninput = ()=>{
	delta = Number(slider.value);
};

function add_mean_gamma(data,i){
	let mean = (data[i]+data[i+1]+data[i+2])/3;
	let r_gamma = g_gamma = b_gamma = Math.log(mean);///Math.log(0.5);
	data[i] = 255 * (data[i]/255)^r_gamma;
	data[i+1] = 255 * (data[i+1]/255)^g_gamma;
	data[i+2] = 255 * (data[i+2]/255)^b_gamma;
}
function double_intensity(data,i){
	let [red,green,blue] = [data[i],data[i+1],data[i+2]];
		data[i] = Math.min(255,red*delta);
		data[i+1] = Math.min(255,green*delta);
		data[i+2] = Math.min(255,blue*delta);
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia( {
	  video : true
  },
  handleVideo, videoError);
}
function showNightVision(){
	ctx.drawImage(video,0,0);

	canvas_image = ctx.getImageData(0,0,canvas.width,canvas.height);
	data = canvas_image.data;
	for(let i=0; i<data.length; i+=4){
		double_intensity(data,i);
		//add_mean_gamma(data,i);
	}
	ctx.putImageData(canvas_image,0,0,0,0,canvas.width, canvas.height);
	
	requestAnimationFrame(showNightVision);
}

function handleVideo(stream) {
	video.onloadedmetadata = ()=>{
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
	};
	video.onplaying = showNightVision;
	//video.src = window.URL.createObjectURL(stream);
	video.srcObject = stream;
}

function videoError(e) {
  alert("Error showing video. Please check your camera.");
}

/*img.onload=()=>{
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.drawImage(img,0,0);
	
	canvas_image = ctx.getImageData(0,0,canvas.width,canvas.height);
	data = canvas_image.data;
	for(let i=0; i<data.length; i+=4){
		double_intensity(data,i);
		//add_mean_gamma(data,i);
	}
	ctx.putImageData(canvas_image,0,0,0,0,canvas.width, canvas.height);
}
img.src = "sample.jpg";*/
