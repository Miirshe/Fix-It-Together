import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useDeleteIssueMutation,
  useDownVotesMutation,
  useFetchIssueQuery,
  useUpvotesMutation,
} from "../../store/Api/FixSlice";
import { useGetUsersQuery } from "../../store/Api/UserSlice";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiChatDeleteFill } from "react-icons/ri";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { CiFlag1 } from "react-icons/ci";
import { CgCalendarDates } from "react-icons/cg";

import { toast } from "react-toastify";
function Detail() {
  const params = useParams();
  const { data: issues = [] } = useFetchIssueQuery();
  const [deleteIssue] = useDeleteIssueMutation();
  const { data: user = [] } = useGetUsersQuery();
  const [upvotes] = useUpvotesMutation();
  const [downVotes] = useDownVotesMutation();

  const navigate = useNavigate();

  const [issue, setIssue] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    location: '',
    downvotes: '',
    upvotes: '',
    user_id: '',
  });
  useEffect(() => {
    const result = issues.find((issue) => {
      return issue.id === Number(params.id);
    });
    console.log(result);
    if (result) {
      setIssue({
        id: result.id,
        title: result.title,
        description: result.description,
        image: result.image,
        location: result.location,
        date: result.date,
        downvotes: result.downvotes,
        upvotes: result.upvotes,
        user_id: result.user_id,
      });
    }
  }, [issues, params.id]);
  const handleDelete = (id) => {
    deleteIssue(id)
      .unwrap()
      .then(() => {
        toast.success("Succesfull Deleted");
        navigate("/");
      });
  };
  const [likes, setLikes] = useState(false);
  const [Unlikes, setUnLikes] = useState(false);
  const [countLike, setCountLike] = useState(issue.upvotes);
  const [countDesLike, setCountDesLike] = useState(issue.upvotes);
  // handle like post issues
  const handleLike = () => {
    if (!likes) {
      setLikes(true);
      setCountLike(countLike + 1);
      upvotes({
        id: Number(params.id),
        upvote: countLike
      })
    }
    else {
      setLikes(false);
      setCountLike(countLike - 1);
      upvotes({
        id: Number(params.id),
        upvote: countLike
      })
    }

  }
  // handle dislike post issues
  const handleDisLike = () => {
    if (!Unlikes) {
      setUnLikes(true);
      setCountDesLike(countDesLike + 1);
      downVotes({
        id: Number(params.id),
        downvote: countDesLike
      })
    }
    else {
      setUnLikes(false);
      setCountDesLike(countDesLike - 1);
      downVotes({
        id: Number(params.id),
        downvote: countDesLike
      })
    }
  }
  console.log(likes)
  return (
    <div className=" w-[95%] mx-auto lg:w-[75%] lg:ml-[22%] mt-10 lg:mt-14 text-[#061826] bg-[#fff] p-3 rounded shadow-sm">
      <button className="px-7 py-2 shadow-md rounded bg-[#061826] text-[#fff]">
        <Link to="/">Back</Link>
      </button>
      <div
        className="w-[100%] mt-4 mx-auto lg:mx-0 flex flex-col lg:flex-row  justify-start items-start lg:items-start transition hover:shadow-md cursor-pointer ease-in-out p-3 shadow rounded border-collapse lg:gap-4"
        key={issue.id}
      >
        <img
          className="w-full lg:w-80  lg:h-72"
          src={issue.image}
          alt="photo fix issue"
        />
        <div className=" space-y-2 mt-3 w-full">
          <h1 className="text-xl font-semibold">{issue.title}</h1>
          <p className="text-base w-11/12">{issue.description} </p>
          <div className="flex flex-col justify-start items-start space-y-1 gap-3">
            <p className="flex flex-row justify-start lg:items-center items-start">
              <CiFlag1 className="mt-2" size={20} />{" "}
              <span className="ml-2">{issue.location}</span>
            </p>
            <p className="flex flex-row justify-start lg:items-center items-start ">
              <CgCalendarDates className="mt-1" size={20} />{" "}
              <span className="ml-2">{issue.date}</span>
            </p>
          </div>
          <div className="flex flex-row justify-between items-start lg:items-center  mt-4 space-y-2 border-t-2 w-full p-1 ">
              <span className="flex flex-row justify-start items-center space-x-6">
                    <AiOutlineLike className={likes ?'inline text-blue-500' : 'inline'} size={25} onClick={()=>handleLike()}/>{countLike}
                    <AiOutlineDislike className={Unlikes ?'inline text-blue-500' : 'inline'} size={25} onClick={()=>handleDisLike()} />{countDesLike}
            </span>
            {user.id === issue.user_id && (
              <span className="flex flex-row justify-start items-center space-x-2">
                <Link to={`/UpdateIssue/${issue.id}`}>
                  <BiSolidEdit size={25} className="inline" />
                </Link>
                <RiChatDeleteFill
                  size={25}
                  onClick={() => handleDelete(issue.id)}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
