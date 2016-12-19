//WLC



document.getElementById('submit').onclick = function(){

	//get inputs and store in variables
	
	//required
	var gender = "female"; //document.getElementsByName('gender');

	var age = 26; //document.getElementById('age').value;
	var weight = 119; //document.getElementById('lbs').value;
	var feet = 5; //document.getElementById('feet').value;
	var inches = 2; //document.getElementById('inches').value;

	var activitylevel = 1.2; //document.getElementById('activitylevel').value;


	//optional
	var intendedcals = 1000; //document.getElementById('intendedcals').value;
	
	// TODO how to handle dates?
	var dateinput = document.getElementById('finishdate').value;
	var finishdate = new Date(dateinput);

	var goalweight = 99; //document.getElementById('goalweight').value;
	var goalBMI = 19; //document.getElementById('goalBMI').value;
	var framesize = "average"; //document.getElementById('framesize').value;
	//var macroratios = document.getElementById('macroratios').value;
	//var calorievariation = document.getElementById('calorievariation').value;


	//check for blanks, if blank alert


	//calculate results and store in variables

	var height = feet * 12 + inches;

	var idealweightlow = ((18.5 * (height * height)) / 703); //lower limit healthy bmi, adjusted by framesize
	var idealweighthigh = ((25 * (height * height)) / 703); //upper limit healthy bmi, adjusted by framesize
	var BMI = ((weight / (height * height)) * 703);
	var adjustedbmi;

	switch(framesize) {
		case 0.9:
			adjustedbmi = BMI * 1.1;
			break;
		case 1.1:
			adjustedbmi = BMI * 0.9;
			break;
		default:
			adjustedbmi = BMI;
	}

	var goalBMIresult = (goalBMI * (height * height)) / 703;

	var BMR;
	if (gender == "male") {
		BMR = (6.25 * weight) + (12.7 * height) - (6.76 * age) + 66; 
	}
	else {
		BMR = (4.35 * weight) + (4.7 * height) - (4.68 * age) + 655;
	}

	var TDEE = BMR * activitylevel;

	var lose1 = TDEE - 250; //lose 0.5lbs per week
	var lose2 = TDEE - 500; //lose 1lb p/w
	var lose3 = TDEE - 1000; //lose 2lbs p/w


	//Math.round( number * 10 ) / 10;

	var deficit = TDEE - intendedcals;
	var daystogoal = ((weight - goalweight) * 3500) / deficit; //how many days until goal weight is reached, based on intended calorie intake
	var dategoalreached; // TODO, calculate from daystogoal

	var finishdateweight = weight - ((deficit * daystogoal) /3500); // loss in lbs by desired finish date
	var calstoreachgoal = TDEE - (((weight - goalweight) * 3500) / daystogoal); // to reach goal by desired date, you'd need to consume this many cals per day

	//var zigzag = [intendedcals * 1.4, intendedcals * 0.5, intendedcals * 1.2, intendedcals * 0.9, intendedcals * 1.3, intendedcals * 0.7, intendedcals];

	//var fivetwolow = TDEE * 0.25;

	var idealweightrange = 'Your current weight is ' + weight + ' lbs. Your ideal weight range is between ' + Math.round( idealweightlow * 10) / 10 + ' lbs and ' + Math.round( idealweighthigh * 10) / 10 + ' lbs.<br>';
	var BMIresults = 'Your current BMI is ' + Math.round( BMI * 10) / 10 + '. To achieve your goal BMI of ' + goalBMI + ' you would need to weigh ' + Math.round( goalBMIresult * 10) / 10 + ' lbs.<br>';
	var BMRresults =  'Your BMR is ' + Math.round( BMR ) + ' calories per day.<br>';
	var TDEEresults = 'Your TDEE is ' + Math.round( TDEE ) + ' calories per day.<br>';
	var tolose = 'To lose 0.5 lbs per week, consume ' + Math.round( lose1 ) + ' calories per day.<br> To lose 1 lb per week, consume ' + Math.round( lose2 ) + ' calories per day.<br>To lose 2 lbs per week, consume ' + Math.round( lose3 ) + ' calories per day.<br>';
	var predictor = 'If you consume ' + intendedcals + ' calories per day, you will weigh ' + finishdateweight + ' lbs on ' + finishdate + '.<br>You would reach your goal weight of ' + goalweight + ' lbs on ' + dategoalreached + '.<br>To weigh ' + goalweight + ' lbs on ' + finishdate + ' you should consume ' + calstoreachgoal + ' calories per day.<br>';


	var results = idealweightrange + BMIresults + BMRresults + TDEEresults + tolose + predictor;


	document.getElementById('results').innerHTML = results;
	//puts results in container
	
	document.getElementById('input').style.display = 'none';
	document.getElementById('results').style.display = 'block';
};

//reloads everything
document.getElementById('reset').onclick = function(){
  history.go(0);
};