window.onload=function(){
	var aDiv=document.getElementsByClassName('ballNum');
	getTicket();
	function getTicket()
	{
		var arr=[];
		while(arr.length<7)
		{
			var n=ran(1,34);
			if(!findArr(arr,n))
			{
				arr.push(bl(n));	
			}
		}
		arr.sort(function(n1,n2){
			return n1-n2;	
		});
		function bl(n)
		{
			return n<10?'0'+n:''+n;	
		}
		
		function findArr(arr,n)
		{
			for(var i=0;i<arr.length;i++)
			{
				if(arr[i]==n)
				{
					return true;
				}	
			}
			return false;
		}
		
		function ran(n,m)
		{
			return Math.floor(Math.random()*(m-n)+n)	
		}	
		for(var i=0;i<aDiv.length;i++)
		{
			aDiv[i].innerHTML=arr[i];	
		}	
	}
	
	var oBtn=document.getElementById('change_btn');
	oBtn.onclick=function(e){
		e.preventDefault();
		getTicket();
		for(var i=0;i<aDiv.length;i++)	
		{
			// aDiv[i].className='ball_active';
		}
		setTimeout(function(){
			for(var i=0;i<aDiv.length;i++)	
			{
				// aDiv[i].className='';
			}		
		},400);
	};
};