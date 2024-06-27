[{
  "residenceId": 1,
  "residenceUser_refId": 123,
  "residenceName": "Cozy Cottage",
  "residenceType": "Cabin",
  "residenceLocation": "Mountain Village",
  "residenceAddress": "123 Mountain Road",
  "residenceRating": 4.5,
  "isActive": true,
  "residenceRooms": [
    {
      "roomId": 101,
      "roomResidence_refId": 1,
      "roomType": "Single",
      "roomAvailability": "Available",
      "roomBedType": "Twin",
      "roomPrice": 50,
      "roomTradingPrice": 45,
      "roomDiscount": 10,
      "roomDescription": "Cozy single room with a view of the mountains.",
      "roomIssueDate": "2024-03-25",
      "roomBooking": [
        {
          "bookingId": 1001,
          "bookingClient_refId": 456,
          "bookingRoom_refId": 101,
          "issueData": "2024-03-25",
          "payments": [
            {
              "paymentId": 5001,
              "paymentBooking_refId": 1001,
              "status": "Paid",
              "transectionId": "ABC123",
              "amount": 50
            }
          ]
        }
      ],
      "roomImages": [
        {
          "imagId": 10001,
          "imagResidenceRoom_refId": 101,
          "imgSrc": "https://example.com/room1.jpg"
        }
      ],
      "roomAmentities": [
        {
          "roomAmenId": 1001,
          "roomAmen_refId": 101,
          "roomAmenType": "Basic",
          "roomAmenGroupName": "General",
          "roomAmentitiesDetails": [
            {
              "roomAmenDetailId": 10001,
              "roomAmenDetail_refId": 1001,
              "roomAmenDetails": "Wi-Fi"
            },
            {
              "roomAmenDetailId": 10002,
              "roomAmenDetail_refId": 1001,
              "roomAmenDetails": "Towels"
            }
          ]
        }
      ],
      "roomCommant": [
        {
          "commantId": 2001,
          "commantResiRoom_refId": 101,
          "command": "Great room with an amazing view!"
        }
      ],
      "roomPolicies": [
        {
          "roomPolicyId": 3001,
          "roomPolicyRoom_refId": 101,
          "roomPolicyName": "Cancellation Policy",
          "roomsPolicyDetails": [
            {
              "roomPolicyDetailsId": 30001,
              "roomPolicyDetails_refId": 3001,
              "roomPolicyDescription": "Free cancellation up to 24 hours before check-in."
            }
          ]
        }
      ]
    }
  ],
  "distance": [
    {
      "distanceId": 1,
      "distanceResidence_refId": 1,
      "distanceFrom": "Airport",
      "distanceValue": 20
    }
  ],
  "residenceImages": [
    {
      "resImgId": 100001,
      "resImgResidence_refId": 1,
      "imgSrc": "https://example.com/residence.jpg"
    }
  ],
  "residenceRatings": [
    {
      "ratingId": 4001,
      "ratingResidence_refId": 1,
      "ratingUser_refId": 789,
      "rateValue": "4.5",
      "command": "Excellent stay!",
      "commandDate": "2024-03-25"
    }
  ],
  "residencceAmentities": [
    {
      "resiAmenId": 2001,
      "resiAmen_refId": 1,
      "resiAmenGroupName": "Leisure",
      "reseAmentitiesDetails": [
        {
          "resiAmenDetailId": 20001,
          "resiAmenDetail_refId": 2001,
          "resiAmenDetails": "Swimming Pool"
        }
      ]
    }
  ]
}
]