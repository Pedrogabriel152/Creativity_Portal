import { IconButton } from "@mui/material";
import { useState } from "react";
import { useGetUsers } from "../GraphQL/Hooks/userHook";
import { useReactiveVar } from "@apollo/client";
import { usersVar } from "../GraphQL/States/userSatate";
import CloseIcon from '@mui/icons-material/Close';
import UserCard from "./UserCard";

interface ISearch {
    name: string
    closeOpen: ()  => void
}

export default function SearchUsers({name, closeOpen}: ISearch) {
    const [show, setShow] = useState(false);
    useGetUsers(`%${name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())}%`, `%${name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toLowerCase())}%`);
    const users = useReactiveVar(usersVar);

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <>
        <IconButton aria-label="delete" sx={{marginLeft: '90%'}} onClick={closeOpen}>
            <CloseIcon color="error"/>
        </IconButton>
        {users && users.data.map(user => (
            <UserCard user={user}/>
        ))}
        </>
    );
}