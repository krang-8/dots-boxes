// Variables
let turn = 0;
let score = 0;
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const boxesWon = [];

if (turn === 0) {
  document.getElementById("turnTitle").innerHTML = "Red's Turn";
} else if (turn === 1) {
  document.getElementById("turnTitle").innerHTML = "Blue's Turn";
} else if (turn === 2) {
  document.getElementById("turnTitle").innerHTML = "Green's Turn";
}
// switch turns
const nextTurn = () => {
	turn = (turn + 1) % 3;
};

//get color
const getColor = (turn) => {
	switch (turn) {
		case 0:
			return "red";
		case 1:
			return "blue";
		case 2:
			return "green";
	}
	return null;
};

// getScores
// returns score array
const getScores = () => {
	var redCount = boxesWon.filter((r) => r === 0).length;
	var blueCount = boxesWon.filter((b) => b === 1).length;
	var greenCount = boxesWon.filter((g) => g === 2).length;
	return [redCount, blueCount, greenCount];
};

// check win
const checkWin = () => {
	const [redCount, blueCount, greenCount] = getScores();
	document.getElementById("redScore").innerHTML = redCount;
	document.getElementById("blueScore").innerHTML = blueCount;
	document.getElementById("greenScore").innerHTML = greenCount;
	console.log(boxesWon);
	if (boxesWon.length === 9) {
		if (redCount === blueCount && blueCount === greenCount) {
			alert("Three Way Draw!");
		} else if (redCount === blueCount && blueCount > greenCount) {
			alert("Red and Blue Tie for first place, Green Loses!");
		} else if (redCount < blueCount && greenCount === blueCount) {
			alert("Green and Blue tie for first place, Red loses!");
		} else if (redCount === greenCount && greenCount > blueCount) {
			alert("Red and Green Tie for first place, Blue loses!");
		} else if (redCount > greenCount && redCount > blueCount) {
			alert("Red Wins!");
		} else if (blueCount > greenCount && blueCount > redCount) {
			alert("Blue Wins!");
		} else if (greenCount > blueCount && greenCount > redCount) {
			alert("Green Wins!");
		}
	}
};

//Creating lines
$(".available").click(function () {
	var won = false;
	/* 
   When box is made, box background color is changed corresponding to player.
   Player 1 = Red
   Player 2 = Blue
   Player 3 = Green
   */
	for (let i = 1; i <= 9; i++) {
		if ($(this).hasClass(`box${i}`) && $(this).hasClass("available")) {
			if (++boxes[i - 1] === 4) {
				$(`#box${i}`).addClass(getColor(turn));
				boxesWon.push(turn);
				checkWin();
				won = true;
			}
		}
	}
  // check if box is available, if it is remove class available and add the color of whoever's turn it is
	if ($(this).hasClass("available")) {
		$(this).removeClass("available");
		$(this).addClass(getColor(turn));
	}

  
	if (!won) {
    nextTurn();
	}
  if (turn === 0) {
    document.getElementById("turnTitle").innerHTML = "Red's Turn";
  } else if (turn === 1) {
    document.getElementById("turnTitle").innerHTML = "Blue's Turn";
  } else if (turn === 2) {
    document.getElementById("turnTitle").innerHTML = "Green's Turn";
  }

});
