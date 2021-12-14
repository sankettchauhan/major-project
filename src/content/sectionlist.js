import MailIcon from "@mui/icons-material/Mail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
// listitem={key:'',link:'',icon:</>,text:''}
export const lists = [
  // list 1
  [
    {
      key: "all-articles",
      link: "/",
      text: "All Articles",
      icon: <MailIcon />,
    },
    {
      key: "search-article",
      link: "/article/search",
      text: "Search Article",
      icon: <SearchIcon />,
    },
    {
      key: "article-add",
      link: "/article/add",
      text: "Add Article",
      icon: <AddCircleOutlineIcon />,
    },
  ],
];
