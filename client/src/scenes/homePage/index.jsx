import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "scenes/navbar"
import UserWidget from "scenes/widgets/UserWidget"
import MakePostWidget from "scenes/widgets/MakePostWidget"
import AdWidget from "scenes/widgets/AdWidget"
import FriendListWidget from "scenes/widgets/FriendsWidget"

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width): 1000px')
    const { _id, picturePath } = useSelector((state) => state.user)

    return (
    <Box>
        <Navbar />
        <Box width='100%' padding='2rem 7%' display={isNonMobileScreens ? 'flex' : 'block'} gap='0.5rem' justifyContent='space-between'>
            <Box flexBasis={isNonMobileScreens ? '27%' : undefined}>
                <UserWidget userId={_id} picturePath={picturePath}/>
            </Box>
            <Box flexBasis={isNonMobileScreens ? '43%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'}>
                <MakePostWidget picturePath={picturePath}/>
                <MakePostWidget userId={_id}/>
            </Box>
            {isNonMobileScreens && (
                <Box flexBasis='27%'>
                    <AdWidget/>
                    <Box m='1.5rem 0'/>
                    <FriendListWidget userId={_id}/>
                </Box>
            )}
        </Box>
    </Box>)
}

export default HomePage