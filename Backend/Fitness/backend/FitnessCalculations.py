import decimal

def cal_Calories_Burned_During_Exercise(activity, weight, duration):
    MET_values = {
        'walking': 3.5,
        'jogging': 7,
        'cycling': 5.5,
        'swimming': 6,
    }

    if activity in MET_values:
        MET = decimal.Decimal(MET_values[activity])
        weight = decimal.Decimal(weight)
        duration = decimal.Decimal(duration)
        calories_burned = MET * weight * duration / 200.00

        return calories_burned
    else:
        return "Invalid activity"


def cal_BMI(weight, height):
    weight = decimal.Decimal(weight)
    height = decimal.Decimal(height)
    bmi = weight / (height ** 2)
    return bmi