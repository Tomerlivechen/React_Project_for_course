//array of objects, each containing a regular expression pattern and an associated title describing the pattern's purpose used for form validation.

const patterns = [
  {
    pattern: ".{1,21}",
    title: "Input must be between 1 and 21 characters",
  },
  {
    pattern: "^.{1,27}",
    title: "Input must be between 1 and 27 characters",
  },
  {
    pattern: "^.{9,20}",
    title: "Please enter a valid phone number",
  },
  {
    pattern: "https?://.+",
    title: "Please enter a valid web address starting with http:// or https://",
  },
  {
    pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]+$",
    title: "Please enter a valid email address",
  },
  {
    //  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*d){4})(?=.*[!@#$%^&*-_]).{8,}$", i tried to using this REGEX pattern but react didn't work properly using it
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*[0-9]){4})(?=.*[\\x21\\x40\\x23\\x24\\x25\\x5E\\x26\\x2A\\x2D\\x5F]).{8,}$",
    title:
      "Password must contain at least one lowercase letter, one uppercase letter, four numbers, one of these symbols (!@#$%^&*-_*) and be at least 8 characters long.",
  },
  {
    pattern: ".{1,}",
    title: "This is a requierd field.",
  },
  {
    pattern: "^(User|Business|Admin)?$",
    title: "Input must be either 'User' or 'Business'",
  },
];

// field configurations to assist in the construction of the registration modal
const formconstruction = {
  firstname: [
    "firstname",
    "text",
    "First Name*",
    patterns[6],
    false,
    true,
    6,
    12,
  ],
  middlename: ["middlename", "text", "Middle Name", "", false, false, 6, 12],
  lastname: ["lastname", "text", "Last Name*", patterns[6], false, true, 6, 12],
  phone: ["phone", "text", "Phone*", patterns[2], false, true, 6, 12],
  email: ["email", "text", "E-mail*", patterns[4], false, true, 6, 12],
  email_closed: ["email", "text", "E-mail*", patterns[4], true, true, 6, 12],
  password: ["password", "text", "Password*", patterns[5], false, true, 6, 12],
  password_closed: [
    "password",
    "text",
    "Password*",
    patterns[6],
    true,
    true,
    6,
    12,
  ],
  image: [
    "image",
    "text",
    "Profile pic URL *",
    patterns[3],
    false,
    true,
    6,
    12,
  ],
  imagealt: [
    "imagealt",
    "text",
    "Image Alt *",
    patterns[6],
    false,
    true,
    6,
    12,
  ],
  state: ["state", "text", "State", "", false, false, 6, 12],
  country: ["country", "text", "Country", "", false, false, 6, 12],
  city: ["city", "text", "City", "", false, false, 6, 12],
  street: ["street", "text", "Street", "", false, false, 6, 12],
  houseNumber: [
    "houseNumber",
    "number",
    "House Number",
    "",
    false,
    false,
    6,
    12,
  ],
  zipCode: ["zipCode", "text", "Zip Code", "", false, false, 6, 12],
  type: ["type", "text", "User Type*", patterns[7], false, true, 6, 12],
  note: ["note", "text", "Aditional info", "", false, false, 6, 12],
};
// field configurations to assist in the construction of the login modal
const loginConstruction = {
  email: ["email", "text", "E-mail", patterns[4], false, true, 12, 12],
  password: [
    "password",
    "password",
    "Password",
    patterns[6],
    false,
    true,
    12,
    12,
  ],
};
// field configurations to assist in the construction of the card modal
const cardFromConstruction = {
  title: ["title", "text", "Title *", patterns[6], false, true, 12, 12],
  subtitle: [
    "subtitle",
    "text",
    "Subtitle *",
    patterns[6],
    false,
    true,
    12,
    12,
  ],
  description: [
    "description",
    "textarea",
    "Description *",
    patterns[6],
    false,
    true,
    12,
    12,
  ],
  phone: ["phone", "text", "Phone *", patterns[2], false, true, 6, 12],
  email: ["email", "text", "Email *", patterns[4], false, true, 6, 12],
  web: ["web", "text", "Website *", patterns[3], false, true, 12, 12],
  image: ["image", "text", "Image Link *", patterns[3], false, true, 6, 12],
  imagealt: [
    "imagealt",
    "text",
    "Image-Alt *",
    patterns[6],
    false,
    true,
    6,
    12,
  ],
  state: ["state", "text", "State", patterns[6], false, false, 6, 12],
  country: ["country", "text", "Country", patterns[6], false, false, 6, 12],
  city: ["city", "text", "City", patterns[6], false, false, 6, 12],
  street: ["street", "text", "Street", patterns[6], false, false, 6, 12],
  houseNumber: [
    "houseNumber",
    "text",
    "House Number",
    patterns[6],
    false,
    false,
    6,
    12,
  ],
  zipCode: ["zipCode", "text", "Zip Code*", patterns[6], false, false, 6, 12],
};
// field configurations to assist in the construction of the Admin's user edit modal
const AdminUseronstruction = {
  Role: ["Role", "text", "User Role", "", false, false, 6, 12],
  Name: ["Name", "text", "User Name*", patterns[6], false, true, 6, 12],
  Email: ["Email", "text", "E-mail*", patterns[4], true, true, 6, 12],
  Password: [
    "Password",
    "Password",
    "Password",
    patterns[6],
    false,
    true,
    6,
    12,
  ],
};

// field configurations to infer the changes in the card filter
const filterPatterns = [
  {
    title: "Cards Page",
    subtitle: "Here you can find business cards from all categories",
  },
  {
    title: "Your Cards",
    subtitle: "Here you can find business cards you have created",
  },
  {
    title: "Your favorite Cards",
    subtitle: "Here you can find your favorite business cards",
  },
  {
    title: "Search Results:",
    subtitle: "",
  },
];

export {
  AdminUseronstruction,
  patterns,
  formconstruction,
  loginConstruction,
  cardFromConstruction,
  filterPatterns,
};
