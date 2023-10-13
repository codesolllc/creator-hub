const postData = [
  {
    id: 1,
    image:
      "https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=",
    title: "Street Photography",
    description:
      "More street art within walking distance of my place in New York,More street art within walking distance of my place in New York",
    userName: "Alpha post",
    likes: 9,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Posting is working fine YAYYYY",
            userName: "Aplaahh Post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 2,
  },
  {
    id: 2,
    image:
      "https://www.shutterstock.com/shutterstock/photos/610909205/display_1500/stock-photo-camera-610909205.jpg",
    title: "Nature Beauty",
    description: "Enjoying the beauty of nature at its finest.",
    userName: "Beta post",
    likes: 15,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "I am amazed by your skills and dedication to this project",
            userName: "Terrain John",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 3,
            text: "Can you tell me how can i learn this skill, i have been trying to learn it too but i cant do it anything like this.....!",
            userName: "Kevin Crown",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 4,
            text: "Highly Recommended",
            userName: "Jack Sherrif",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 5,
            text: "How can i order your services",
            userName: "Dawayne Holland",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 6,
            text: "Testing Data",
            userName: "John Williams",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 5,
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/618066222/photo/camera-capturing-a-forest.jpg?s=612x612&w=0&k=20&c=Mqr3fFI2QPY09_bu3GyRYJvcdwBO2qeHPT88GFsLTS4=",
    title: "Delicious Food",
    description: "Savoring this mouthwatering dish at my favorite restaurant.",
    userName: "Charlie post",
    likes: 12,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 3,
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxb604gQ_Y4wR-oYUlIlOCOqM1ryaWvfnZs5hsQYo&s",
    title: "City Night",
    description: "Exploring the city at night, full of lights and life.",
    userName: "Delta post",
    likes: 20,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 8,
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?cs=srgb&dl=pexels-fox-225157.jpg&fm=jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 16,
    image:
      "https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 17,
    image:
      "https://media.istockphoto.com/id/529666334/photo/digital-camera.jpg?s=170667a&w=0&k=20&c=iUApI0KBhuWOPMrZxRnw1KQfAHJCw9_HDihsbxKIuQI=",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 18,
    image:
      "https://pbblogassets.s3.amazonaws.com/uploads/2020/07/19080819/Camera-Tech-Cover-photo.jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 19,
    image:
      "https://pbblogassets.s3.amazonaws.com/uploads/2020/07/19080819/Camera-Tech-Cover-photo.jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 20,
    image:
      "https://cdn.pixabay.com/photo/2013/11/28/10/02/camera-219958_640.jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 21,
    image:
      "https://cdn.britannica.com/67/92867-050-BC3DC984/cameras-camera-reviews-crystal-displays-photographs-film.jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 22,
    image:
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?cs=srgb&dl=pexels-fox-225157.jpg&fm=jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 23,
    image:
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?cs=srgb&dl=pexels-fox-225157.jpg&fm=jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 24,
    image:
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?cs=srgb&dl=pexels-fox-225157.jpg&fm=jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 25,
    image:
      "https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?cs=srgb&dl=pexels-fox-225157.jpg&fm=jpg",
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 6,
    title: "Street Photography",
    description:
      "More street art within walking distance of my place in New York,More street art within walking distance of my place in New York",
    userName: "Alpha post",
    likes: 9,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 2,
  },
  {
    id: 7,
    // image: require('../assets/Home/recbg1.png'),
    title: "Nature Beauty",
    description: "Enjoying the beauty of nature at its finest.",
    userName: "Beta post",
    likes: 15,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 5,
  },
  {
    id: 8,
    // image: require('../assets/Home/recbg1.png'),
    title: "Delicious Food",
    description: "Savoring this mouthwatering dish at my favorite restaurant.",
    userName: "Charlie post",
    likes: 12,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 3,
  },
  {
    id: 9,
    // image: require('../assets/Home/recbg1.png'),
    title: "City Night",
    description: "Exploring the city at night, full of lights and life.",
    userName: "Delta post",
    likes: 20,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 8,
  },
  {
    id: 10,
    // image: require('../assets/Home/recbg1.png'),
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
  {
    id: 11,
    video: require("../assets/Videos/video.mp4"),
    title: "Street Photography",
    description:
      "More street art within walking distance of my place in New York,More street art within walking distance of my place in New York",
    userName: "Alpha post",
    likes: 9,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 2,
  },
  {
    id: 12,
    video: require("../assets/Videos/video.mp4"),
    title: "Nature Beauty",
    description: "Enjoying the beauty of nature at its finest.",
    userName: "Beta post",
    likes: 15,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 5,
  },
  {
    id: 13,
    video: require("../assets/Videos/video.mp4"),
    title: "Delicious Food",
    description: "Savoring this mouthwatering dish at my favorite restaurant.",
    userName: "Charlie post",
    likes: 12,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Tell Me What's Wrong With It",
            userName: "A|_p|-|@ P0$t!NG",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 3,
            text: "Creating new reply",
            userName: "Andrew Cruisine",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 4,
            text: "new reply for testing purpose",
          },
        ],
      },
    ],
    shares: 3,
  },
  {
    id: 14,
    video: require("../assets/Videos/video.mp4"),
    title: "City Night",
    description: "Exploring the city at night, full of lights and life.",
    userName: "Delta post",
    likes: 20,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 8,
  },
  {
    id: 15,
    video: require("../assets/Videos/video.mp4"),
    title: "Adventures Ahead",
    description: "Embarking on a thrilling adventure with my friends.",
    userName: "Echo post",
    likes: 30,
    comments: [
      {
        id: 1,
        text: "Great photo!",
        userName: "dolly",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Thanks! Glad you liked it.",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 2,
        text: "Amazing shot!",
        userName: "jane_doe",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Appreciate the kind words!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
          {
            id: 2,
            text: "Thank you!",
            userName: "Beta post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
      {
        id: 3,
        text: "Keep up the good work!",
        userName: "john_smith",
        userProfileImage: require("../assets/Auth/user_profile.png"),
        replies: [
          {
            id: 1,
            text: "Will do, thank you!",
            userName: "Alpha post",
            userProfileImage: require("../assets/Auth/user_profile.png"),
          },
        ],
      },
    ],
    shares: 10,
  },
];

export default postData;
