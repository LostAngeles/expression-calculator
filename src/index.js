function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/ /g, ""); 
    if (expr.includes("/0")) throw new Error ("TypeError: Division by zero."); 

    let answer = 0;                                                
	let incomingArray = [];										  
	let incomingStr = expr;                                       
	incomingStr = incomingStr.replace(/ /g, "");             
	
	let leftDigit    = [];        
	let rightDigit   = [];         
	let counterLeft  = 0;          
	let counterRight = 0;          
	let RangeOfLeft = 0;
	let RangeOfRight = 0;
	let calculatingArray = [];
	let result = 0;

	let bracketPosition = 0;
	let bracketsArray = [] // in case we have brackets
	let bracketsArrayCounter = 0;
	let bracketsAnswer = 0;
	let firstBracket = 0;
	let lastBracket = 0;	

	let experiment = [];
	let experimentString = "";

	incomingArray = incomingStr.split("");

	let leftBracketCounter = 0;           // counter for left brackets
	let rightBracketCounter = 0;          // counter for right brackets   

    for (let i = 0; i < incomingArray.length; i ++) {                // If amount of brackets
		if (incomingArray[i] == "(") leftBracketCounter ++;          // is uneven we have to 
		else if (incomingArray[i] == ")") rightBracketCounter++;     // return false immediately 
    }
    
    if (leftBracketCounter !== rightBracketCounter) throw new Error ("ExpressionError: Brackets must be paired"); 

while (leftBracketCounter>0){
	for (let s = 0; s < incomingArray.length; s++) {
		if (incomingArray[s] == "(") {			
			bracketPosition++;			
			if (bracketPosition == leftBracketCounter) {
				firstBracket = s;
				//alert(firstBracket);
				for (let v = s+1; incomingArray[v] != ")"; v++) {
					bracketsArray[bracketsArrayCounter] = incomingArray[v];
					bracketsArrayCounter++;					
				}
				lastBracket = firstBracket + bracketsArray.length + 1;
				//alert(lastBracket);
				bracketsAnswer = +(expressionSolver(bracketsArray).join(""));
				incomingArray.splice(firstBracket+1, lastBracket-firstBracket);
				incomingArray[firstBracket] = bracketsAnswer;				
				//alert(incomingArray)			
				bracketPosition = 0;
				leftBracketCounter--;
				bracketsAnswer = 0;
				bracketsArray = [];
				bracketsArrayCounter= 0;
				//alert(incomingArray);				
			}
		}			
	}
}
	//alert(incomingArray);

	answer = expressionSolver(incomingArray).join("");
	answer = answer.replace(/,/g, "");	
	

	//*********************************************************************************************************************\\

	function expressionSolver(incomingArray) {
			////////////////////////////////////////////////////// division \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	for (let j = 0; j < incomingArray.length; j++) {
		////////// detect / sign \\\\\\\\\\\
		if (incomingArray[j] == "/") {
			//alert("we found one / more")
			///// found left digit
			for (let left = j-1; incomingArray[left]!="*" && incomingArray[left]!="-" && incomingArray[left]!="+" && incomingArray[left]!="/" && left >= 0; left--) {
				//alert("incomingArray[left] == " + incomingArray[left])
				leftDigit[counterLeft] = incomingArray[left];
				counterLeft++;
				RangeOfLeft = left;
			}
			///// found right digit
			for (let right = j+1; incomingArray[right]!="*" && incomingArray[right]!="-" && incomingArray[right]!="+" && incomingArray[right]!="/" && right < incomingArray.length; right++) {
				//alert("incomingArray[right] == " + incomingArray[right])
				rightDigit[counterRight] = incomingArray[right];
				counterRight++;
				RangeOfRight = right;
			}
			leftDigit = leftDigit.reverse();	
			//alert(leftDigit);
			experiment[0] = leftDigit;                              // left digit of wanted number
			experiment[1] = "/";                                    // sing of operator
			experiment[2] = rightDigit;                             // right digit of wnated number
			experimentString = experiment.join("");                 // array to string
			experimentString = experimentString.replace(/,/g, "");  // remove "," sign
			calculatingArray = experimentString.split("/")
			result = (calculatingArray[0]/calculatingArray[1]);    // calculating....
			//alert(result)
			incomingArray.splice(RangeOfLeft+1, RangeOfRight-RangeOfLeft); // Deleting part of expressions with *
			incomingArray[RangeOfLeft] = result;			               // And Past our result
			leftDigit = [];			
			rightDigit = [];
			counterLeft = 0;
			counterRight = 0;
			j = 0;
		}//alert(incomingArray);
	}	

	////////////////////////////////////////////////////// multiplication \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	for (let j = 0; j < incomingArray.length; j++) {
		////////// detect * sign \\\\\\\\\\\
		if (incomingArray[j] == "*") {
			//alert("we found one * more")
			///// found left digit
			for (let left = j-1; incomingArray[left]!="*" && incomingArray[left]!="-" && incomingArray[left]!="+" && incomingArray[left]!="/" && left >= 0; left--) {
				//alert("incomingArray[left] == " + incomingArray[left])
				leftDigit[counterLeft] = incomingArray[left];
				counterLeft++;
				RangeOfLeft = left;
			}
			///// found right digit
			for (let right = j+1; incomingArray[right]!="*" && incomingArray[right]!="-" && incomingArray[right]!="+" && incomingArray[right]!="/" && right < incomingArray.length; right++) {
				//alert("incomingArray[right] == " + incomingArray[right])
				rightDigit[counterRight] = incomingArray[right];
				counterRight++;
				RangeOfRight = right;
			}
			leftDigit = leftDigit.reverse();	
			//alert(leftDigit);
			experiment[0] = leftDigit;                              // left digit of wanted number
			experiment[1] = "*";                                    // sing of operator
			experiment[2] = rightDigit;                             // right digit of wnated number
			experimentString = experiment.join("");                 // array to string
			experimentString = experimentString.replace(/,/g, "");  // remove "," sign
			calculatingArray = experimentString.split("*")
			result = (calculatingArray[0]*calculatingArray[1]);    // calculating....
			//alert(result)
			incomingArray.splice(RangeOfLeft+1, RangeOfRight-RangeOfLeft); // Deleting part of expressions with *
			incomingArray[RangeOfLeft] = result;			               // And Past our result
			leftDigit = [];			
			rightDigit = [];
			counterLeft = 0;
			counterRight = 0;
			j = 0;
		}//alert(incomingArray);
	}

	
	////////////////////////////////////////////////////// subtraction \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	for (let j = 0; j < incomingArray.length; j++) {
		////////// detect - sign \\\\\\\\\\\
		if (incomingArray[j] == "-") {
			//alert("we found one - more")
			///// found left digit
			for (let left = j-1; incomingArray[left]!="*" && incomingArray[left]!="-" && incomingArray[left]!="+" && incomingArray[left]!="/" && left >= 0; left--) {
				//alert("incomingArray[left] == " + incomingArray[left])
				leftDigit[counterLeft] = incomingArray[left];
				counterLeft++;
				RangeOfLeft = left;
			}
			///// found right digit
			for (let right = j+1; incomingArray[right]!="*" && incomingArray[right]!="-" && incomingArray[right]!="+" && incomingArray[right]!="/" && right < incomingArray.length; right++) {
				//alert("incomingArray[right] == " + incomingArray[right])
				rightDigit[counterRight] = incomingArray[right];
				counterRight++;
				RangeOfRight = right;
			}
			leftDigit = leftDigit.reverse();	
			//alert(leftDigit);
			experiment[0] = leftDigit;                              // left digit of wanted number
			experiment[1] = "!";                                    // sing of operator
			experiment[2] = rightDigit;                             // right digit of wnated number
			experimentString = experiment.join("");                 // array to string
			experimentString = experimentString.replace(/,/g, "");  // remove "," sign
			calculatingArray = experimentString.split("!")
			result = ((+calculatingArray[0])-(+calculatingArray[1]));    // calculating....
			//alert(result)
			incomingArray.splice(RangeOfLeft+1, RangeOfRight-RangeOfLeft); // Deleting part of expressions with *
			incomingArray[RangeOfLeft] = result;			               // And Past our result
			leftDigit = [];			
			rightDigit = [];
			counterLeft = 0;
			counterRight = 0;
			j = 0;
			
		}//alert(incomingArray);
	}
	
	////////////////////////////////////////////////////// addition \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	for (let j = 0; j < incomingArray.length; j++) {
		////////// detect + sign \\\\\\\\\\\
		if (incomingArray[j] == "+") {
			//alert("we found one - more")
			///// found left digit
			for (let left = j-1; incomingArray[left]!="*" && incomingArray[left]!="-" && incomingArray[left]!="+" && incomingArray[left]!="/" && left >= 0; left--) {
				//alert("incomingArray[left] == " + incomingArray[left])
				leftDigit[counterLeft] = incomingArray[left];
				counterLeft++;
				RangeOfLeft = left;
			}
			///// found right digit
			for (let right = j+1; incomingArray[right]!="*" && incomingArray[right]!="-" && incomingArray[right]!="+" && incomingArray[right]!="/" && right < incomingArray.length; right++) {
				//alert("incomingArray[right] == " + incomingArray[right])
				rightDigit[counterRight] = incomingArray[right];
				counterRight++;
				RangeOfRight = right;
			}
			leftDigit = leftDigit.reverse();	
			//alert(leftDigit);
			experiment[0] = leftDigit;                              // left digit of wanted number
			experiment[1] = "+";                                    // sing of operator
			experiment[2] = rightDigit;                             // right digit of wnated number
			experimentString = experiment.join("");                 // array to string
			experimentString = experimentString.replace(/,/g, "");  // remove "," sign
			calculatingArray = experimentString.split("+")
			result = ((+calculatingArray[0])+(+calculatingArray[1]));    // calculating....
			//alert(result)
			incomingArray.splice(RangeOfLeft+1, RangeOfRight-RangeOfLeft); // Deleting part of expressions with *
			incomingArray[RangeOfLeft] = result;			               // And Past our result
			leftDigit = [];			
			rightDigit = [];
			counterLeft = 0;
			counterRight = 0;
			j = 0;
			
		}
	}

	return incomingArray;
}
    
    return +answer;
}

module.exports = {
    expressionCalculator
}