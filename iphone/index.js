

function init() {
    
}

function changebackgroundcolor()  {
    let b=document.querySelector('h1');
    b.classList.add('bgblue');
}

function toggleText(feature) {
    let featureText='';
    switch(feature) {
        case 'c':featureText=`A camera that takes beautiful shots. It just got a whole lot harder to take a bad photo.
        All‑new dual‑camera system. 
        Take your photos from wide to ultrawide. 
        A redesigned interface uses the new Ultra Wide camera to show you what’s happening outside the frame — 
        and lets you capture it. Shoot and edit videos as easily as you do photos. It’s the world’s most popular 
        camera, now with a whole new perspective.
        `;
        break;
        case 's':featureText="The amazing retina screen will take your breath away";
        break;
        case 'p':featureText="A processor thats blazingly fast";
        break;
        case 'v':featureText=`Amazing video to capture beautiful moments. Shoot and 
        edit the highest-quality video in a smartphone. iPhone 11 shoots beautifully sharp 4K video at 60 fps across all its cameras. The Ultra Wide camera captures four times more scene, so it’s perfect for action shots like your dog catching a frisbee. If you’re recording a performance — say, your kid’s piano recital — 
        when you zoom in, the audio zooms too. And now you can edit videos as easily as you do photos.`;
        break; 
    }

    let p=document.getElementById("toggleText");
    p.innerHTML=featureText+'<br><a href="#">Get the details</a>';
}
