import decimal

def cal_Calories_Burned_During_Exercise(activity, weight, duration):
    MET_values = {
        'walking': decimal.Decimal('3.5'),
        'jogging': decimal.Decimal('7.0'),
        'cycling': decimal.Decimal('5.5'),
        'swimming': decimal.Decimal('6.0'),
    }

    if activity in MET_values:
        MET = MET_values[activity]
        weight = decimal.Decimal(weight)
        duration = decimal.Decimal(duration)
        calories_burned = (MET * weight * duration) / decimal.Decimal('200.00')

        return calories_burned
    else:
        return "Invalid activity"