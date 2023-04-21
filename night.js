let img = document.getElementById("image");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
function add_mean_gamma(data,i){
	let mean = (data[i]+data[i+1]+data[i+2])/3;
	let r_gamma = g_gamma = b_gamma = Math.log(mean);///Math.log(0.5);
	//console.log(r_gamma);
	data[i] = 255 * (data[i]/255)^r_gamma;
	data[i+1] = 255 * (data[i+1]/255)^g_gamma;
	data[i+2] = 255 * (data[i+2]/255)^b_gamma;
}
function double_intensity(data,i){
	let delta = 5;
	let [red,green,blue] = [data[i],data[i+1],data[i+2]];
	//if(red*delta<=255&&blue*delta<=255&&blue*delta<=255){
		data[i] = Math.min(255,red*delta);
		data[i+1] = Math.min(255,green*delta);
		data[i+2] = Math.min(255,blue*delta);
	//}
}
img.onload=()=>{
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
img.src = "sample.jpg";
