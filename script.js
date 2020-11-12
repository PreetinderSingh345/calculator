var screen=document.getElementById("bottom-screen");//getting bottom screen

var smallScreen=document.getElementById("top-screen");//getting the top screen

var operator=null;//the operator which is null as of now

var operand1="0";//default value of operand1 which is 0 and this is displayed intially on the calculator

var operand2=null;//operand2 which is null too like the operator

var res=null;//this is the result which is not known as of now and is null too

var keys=document.getElementsByClassName("key");//getting keys which is the array of all the keys of the calculator

var countOfDecimals=0;//count of decimals used is mainted

var prevKey=null;//previous key which was pressed i.e. null as of now

var currKey=null;//current key which is pressed and is null too as of now

function makeString(operand1, operator, operand2, equal){//function for making a string corresponding to operand1, operator and operand2 and then returning it

	var str="";
	if(operand1!=null){
		str+=operand1;
	}
	if(operator!=null){
		str+=operator;
	}
	if(operand2!=null){
		str+=operand2;
	}
	if(equal){
		str+="=";
	}
	return str;

}

function makeChange(event){//this function is responsible for making all the changes in the content i.e. displayed on the screens

	var keyVal=null;//getting the value of the key which is pressed
	var isNum=false;//checking if the key is a number key

	if(event.type=="click"){//getting the above values in case of a mouse click
		keyVal=this.getAttribute("data-val");
		isNum=this.classList.contains("num");
		currKey=this;
	}
	else{//getting the above values in case of a keyboard click
		if(event.key=="."){
			isNum=true;
			keyVal=".";
			currKey=document.getElementsByName(".")[0];
		}
		else{
			for(var i=0;i<10;i++){
				if(parseInt(event.key)==i){
					isNum=true;
					i=i.toString();
					keyVal=i;
					currKey=document.getElementsByName(i)[0];
					break;
					i=parseInt(i);
				}
			}
		}	
		if(!isNum){		
			if(event.key=="%"){
				keyVal="%";
				currKey=document.getElementsByName("%")[0];
			}
			else if(event.key=="Delete" || event.key=="Backspace"){
				keyVal="del";
				currKey=document.getElementsByName("del")[0];
			}	
			else if(event.key=="=" || event.key=="Enter"){
				keyVal="=";
				currKey=document.getElementsByName("=")[0];
			}
			else if(event.key=="c" || event.key=="C"){
				keyVal="c";
				currKey=document.getElementsByName("c")[0];
			}
			else if(event.key=="+"){
				keyVal="+";
				currKey=document.getElementsByName("+")[0];
			}
			else if(event.key=="-"){
				keyVal="-";
				currKey=document.getElementsByName("-")[0];
			}
			else if(event.key=="*"){
				keyVal="*";
				currKey=document.getElementsByName("*")[0];
			}
			else if(event.key=="/"){
				keyVal="/";
				currKey=document.getElementsByName("/")[0];
			}
			else{
				return ;
			}
		}
	}

	if(prevKey!=null){
		prevKey.removeAttribute("style");//this is to make the styling of the previous key back to normal when a new key is pressed
	}	
	if(currKey!=null){//adding more style to the key which is pressed currently
		currKey.style.border="1px outset #494545";	
		if(currKey.classList.contains("grey")){
			currKey.style.boxShadow="0 0 2px 2px #b7b6b6 inset";
		}
		else if(currKey.classList.contains("orange")){
			currKey.style.boxShadow="0 0 2px 2px #f3b458 inset";
		}
		else{
			currKey.style.boxShadow="0 0 2px 2px #71cdea inset";
		}

		if(currKey.classList.contains("grey")){
			currKey.style.backgroundColor="#d2d1d1";	
		}
		else if(currKey.classList.contains("orange")){
			currKey.style.backgroundColor="#f5c885";
		}
		else{
			currKey.style.backgroundColor="#93daf1";
		}
		prevKey=currKey;//making the current key the previous one
	}

	if(isNum){// to evalute the situation when the key i.e. pressed is a number i.e. from 0 to 9 and the decimal key is taken as a number too as it is a part of the number
		if(operator==null){
			if(operand1=="0"){
				if(keyVal=="0"){

				}
				else if(keyVal=="."){
					if(countOfDecimals==0){
						operand1+=keyVal;
						countOfDecimals++;
					}
				}				
				else{
					if(countOfDecimals==0){
						operand1=keyVal;						
					}
					else{
						operand1+=keyVal;
					}
				}
			}	
			else if(operand1==null){
				if(keyVal=="."){

				}
				else{
					operand1=keyVal;					
				}			
			}
			else if(keyVal=="."){
				if(countOfDecimals==0){
					operand1+=keyVal;
					countOfDecimals++;
				}
			}	
			else{
				operand1+=keyVal;
			}
			screen.innerText=operand1;
			smallScreen.innerText=makeString(operand1, operator, operand2, false);

		}
		else{
			if(operand2=="0"){
				if(keyVal=="0"){

				}
				else if(keyVal=="."){
					if(countOfDecimals==0){
						operand2+=keyVal;
						countOfDecimals++;
					}
				}				
				else{
					if(countOfDecimals==0){
						operand2=keyVal;						
					}
					else{
						operand2+=keyVal;
					}
				}
			}
			else if(operand2==null){
				if(keyVal=="."){
					
				}
				else{
					operand2=keyVal;
				}				
			}
			else if(keyVal=="."){
				if(countOfDecimals==0){
					operand2+=keyVal;
					countOfDecimals++;
				}
			}
			else{
				operand2+=keyVal;
			}
			screen.innerText=operand2;
			console.log(operand1+" "+operator+" "+operand2);
			smallScreen.innerText=makeString(operand1, operator, operand2, false);
		}
	}
	else{//to evaluate the situation when the key i.e. pressed is not a number
		if(keyVal=="%"){//percentage key is pressed
			if(operator==null){
				if(operand1==null){

				}
				else{
					operand1="0";
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					countOfDecimals=0;
				}
			}
			else{
				if(operand2==null){
					operand2=operand1/100;
					operand2=operand2.toString();
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand2.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand2[i]=="."){
							countOfDecimals=1;
							break;
						}
					}
				}
				else{
					operand2=operand2/100;
					operand2=operand2.toString();
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand2.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand2[i]=="."){
							countOfDecimals=1;
							break;
						}
					}
				}
			}
		}
		else if(keyVal=="ce"){//ce key is pressed
			if(operator==null){				
				operand1="0";
				screen.innerText=operand1;	
				smallScreen.innerText=makeString(operand1, operator, operand2, false);
				countOfDecimals=0;			
			}
			else{						
				operand2="0";
				screen.innerText=operand2;		
				smallScreen.innerText=makeString(operand1, operator, operand2, false);
				countOfDecimals=0;		
			}
		}
		else if(keyVal=="c"){//c key is pressed
			operand1="0";
			operator=null;
			operand2=null;
			countOfDecimals=0;
			screen.innerText=operand1;
			smallScreen.innerText=makeString(operand1, operator, operand2, false);
		}
		else if(keyVal=="del"){//del key is pressed
			if(operator==null){
				if(operand1=="0"){

				}
				else if(operand1==null){
					operand1="0";
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
				else{
					if(operand1[operand1.length-1]=="."){
						countOfDecimals=0;
					}
					operand1=operand1.substring(0, operand1.length-1);	
					if(operand1==""){
						operand1="0";
					}
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);						
				}				
			}
			else{
				if(operand2==null){
					operator=null;
				}
				else{
					if(operand2=="0"){

					}					
					else{
						if(operand2[operand2.length-1]=="."){
							countOfDecimals=0;
						}
						operand2=operand2.substring(0, operand2.length-1);
						if(operand2==""){
							operand2="0";
						}
						screen.innerText=operand2;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
					}										
				}
			}
		}	
		else if(keyVal=="one-by-x"){//inverse key is pressed
			if(operator==null){	
				if(operand1==null){

				}	
				else if(parseFloat(operand1)==0){
					screen.innerText="Cannot divide by zero";					
					operand1=null;					
					countOfDecimals=0;					
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
				else{
					operand1=1/operand1;
					operand1=operand1.toString();
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand1.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand1[i]=="."){
							countOfDecimals=1;
							break;
						}
					}
				}
			}				
			else{
				if(operand2==null){				
					if(parseFloat(operand1)==0){
						screen.innerText="Cannot divide by zero";						
						operand1=null;
						operator=null;							
						smallScreen.innerText=makeString(operand1, operator, operand2, false);		
					}
					else{
						operand2=1/operand1;
						operand2=operand2.toString();
						screen.innerText=operand2;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
						var len=operand2.length;
						countOfDecimals=0;
						for(var i=0;i<len;i++){
							if(operand2[i]=="."){
								countOfDecimals=1;
								break;
							}
						}
					}
				}
				else{
					if(parseFloat(operand2)==0){
						screen.innerText="Cannot divide by zero";						
						operand1=null;
						operator=null;
						operand2=null;
						countOfDecimals=0;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
					}
					else{
						operand2=1/operand2;
						operand2=operand2.toString();
						screen.innerText=operand2;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
						var len=operand2.length;
						countOfDecimals=0;
						for(var i=0;i<len;i++){
							if(operand2[i]=="."){
								countOfDecimals=1;
								break;
							}
						}
					}
				}
			}
		}
		else if(keyVal=="x-square"){//square key is pressed
			if(operator==null){
				if(operand1==null){

				}
				else{
					operand1=operand1*operand1;
					operand1=operand1.toString();
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand1.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand1[i]=="."){
							countOfDecimals=1;
							break;
						}
					}	
				}
			}
			else{
				if(operand2==null){
					operand2=operand1*operand1;
					operand2=operand2.toString();
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand2.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand2[i]=="."){
							countOfDecimals=1;
							break;
						}
					}						
				}
				else{
					operand2=operand2*operand2;
					operand2=operand2.toString();
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand2.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand2[i]=="."){
							countOfDecimals=1;
							break;
						}
					}	
				}
			}
		}
		else if(keyVal=="under-root-two"){//square root key is pressed
			if(operator==null){	
				if(operand1==null){

				}	
				else if(operand1<"0"){
					screen.innerText="Invalid input";					
					operand1=null;
					countOfDecimals=0;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
				else{	
					operand1=Math.sqrt(parseFloat(operand1));
					operand1=operand1.toString();
					screen.innerText=operand1;	
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
					var len=operand1.length;
					countOfDecimals=0;
					for(var i=0;i<len;i++){
						if(operand1[i]=="."){
							countOfDecimals=1;
							break;
						}
					}	
				}
			}
			else{
				if(operand2==null){
					if(operand1<"0"){
						screen.innerText="Invalid input";						
						operand1=null;
						operator=null;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
					}
					else{
						operand2=Math.sqrt(parseFloat(operand1));
						operand2=operand2.toString();
						screen.innerText=operand2;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
						var len=operand2.length;
						countOfDecimals=0;
						for(var i=0;i<len;i++){
							if(operand2[i]=="."){
								countOfDecimals=1;
								break;
							}
						}						
					}
				}
				else{
					if(operand2<"0"){
						screen.innerText="Invalid input";						
						operand1=null;
						operator=null;
						operand2=null;
						countOfDecimals=0;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);
					}
					else{
						operand2=Math.sqrt(parseFloat(operand2));
						operand2=operand2.toString();
						screen.innerText=operand2;
						smallScreen.innerText=makeString(operand1, operator, operand2, false);					
						var len=operand2.length;
						countOfDecimals=0;
						for(var i=0;i<len;i++){
							if(operand2[i]=="."){
								countOfDecimals=1;
								break;
							}
						}	
					}
				}
			}	
		}							
		else if(keyVal=="plus-minus"){//alternate sign key is pressed
			if(operator==null){
				if(operand1==null){

				}
				else if(operand1=="0"){

				}
				else{
					if(operand1[0]=="-"){
						operand1=operand1.substring(1);
					}
					else{
						operand1="-"+operand1;
					}
					screen.innerText=operand1;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
			}
			else{
				if(operand2==null){
					if(operand1=="0"){
						operand2="0";
					}
					else{
						if(operand1[0]=="-"){
							operand2=operand1.substring(1);
						}
						else{
							operand2="-"+operand1;
						}						
					}
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
				else{
					if(operand2=="0"){

					}
					else{
						if(operand2[0]=="-"){
							operand2=operand2.substring(1);
						}
						else{
							operand2="-"+operand2;
						}	
					}
					screen.innerText=operand2;
					smallScreen.innerText=makeString(operand1, operator, operand2, false);
				}
			}
		}
		else if(keyVal=="="){//when the equal to key is pressed
			if(operand1==null){
				operand1="0";
				screen.innerText=operand1;
				smallScreen.innerText=makeString(operand1, operator, operand2, false);
			}
			else if(operator==null){

			}			
			else{
				if(operand2==null){
					operand2=operand1;
				}
				smallScreen.innerText=makeString(operand1, operator, operand2, true);
				console.log(operand1+" "+operator+" "+operand2);
				try{
					operand1=eval(operand1+" "+operator+" "+operand2);
				}
				catch(e){
					screen.innerText="Inavlid input";
					operand1=null;
					operator=null;
					operand2=null;
					return ;
				}				
				operand1=operand1.toString();
				screen.innerText=operand1;					
				var len=operand1.length;
				countOfDecimals=0;
				for(var i=0;i<len;i++){
					if(operand1[i]=="."){
						countOfDecimals=1;
						break;
					}
				}
				operator=null;
				operand2=null;					
			}
		}
		else{
			if(operand1!=null && operand2==null){			
				operator=keyVal;
				screen.innerText="";				
				countOfDecimals=0;	
				smallScreen.innerText=makeString(operand1, operator, operand2, false);			
			}	
			if(operand2!=null){
				try{
					operand1=eval(operand1+" "+operator+" "+operand2);
				}
				catch(e){
					screen.innerText="Inavlid input";
					operand1=null;
					operator=null;
					operand2=null;
					return ;
				}
				operand1=operand1.toString();							
				operator=keyVal;
				screen.innerText="";				
				countOfDecimals=0;				
				operand2=null;		
				smallScreen.innerText=makeString(operand1, operator, operand2, false);		
			}	
		}
	}

}

for(var i=0;i<keys.length;i++){//iterating on all the keys of the calculator

	var key=keys[i];//obtaining a particular key

	key.addEventListener("click", makeChange);//handling the event when that key is pressed through a mouse click and calling makeChange function to handle this event

	document.addEventListener("keydown", makeChange);//handling the event when that key is pressed through a keyboard click and calling makeChange function to handle this event

}