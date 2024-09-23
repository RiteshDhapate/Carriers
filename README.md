# server url 
```curl
https://carriers-nine.vercel.app
```

# Ai suggested Mile
```curl
https://carriers-nine.vercel.app/api/v1/Mile-suggestion
```

it it as a post request that take some parameters
```json
{
    "MilesCarriers":["UPS","FedEx","DHL"],
    "selectedCarrier":"FedEx"
}
```

# get cost info like total cost, total savings and total discount

```curl
https://carriers-nine.vercel.app/api/v1/cost-info
```

it is a post request that takes some parameters

```json
{
  "shippingVolume": "100 packages per week",
  "packageDimensions": "10x8x6 inches",
  "packageWeight": "5 lbs",
  "origin": "Los Angeles, CA",
  "destination": "New York, NY",
  "serviceLevel": "Ground",
  "currentCosts": "$8.00 per package with UPS",
  "firstMileCarrier": "FedEx",
  "firstMileDistance": 10,
  "middleMileCarrier": "Spee-Dee Delivery",
  "middleMileDistance": 1500,
  "lastMileCarrier": "USPS",
  "lastMileDistance": 15
}
```

# get the estimate like Mile cost and delivery_days

```curl
https://carriers-nine.vercel.app/api/v1/estimate
```

it is a post request that take some parameters 
``` json
{
  "carrier_ids": [
    "se-836174"
  ],
  "from_country_code": "US",
  "from_postal_code": "78756",
  "to_country_code": "US",
  "to_postal_code": "95128",
  "to_city_locality": "San Jose",
  "to_state_province": "CA",
  "weight": {
    "value": 1,
    "unit": "ounce"
  },
  "dimensions": {
    "unit": "inch",
    "length": 5,
    "width": 5,
    "height": 5
  },
  "confirmation": "none",
  "address_residential_indicator": "no"
}
```