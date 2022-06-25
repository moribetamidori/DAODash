import React from "react";
import {MoralisProvider} from "react-moralis";
import {useMoralis} from "react-moralis";
import { Box, Button } from "@chakra-ui/react";
const MoralisAuth = () => {
    const {authenticate, isAuthenticated, user} = useMoralis();
    if(!isAuthenticated){
        return (
            <div>
                <Box display="flex">
                    <Button 
                    onClick={()=> authenticate()}
                    >
                        Sign in with Metamask

                    </Button>
                </Box>

            </div>
        )
    }

    return <div>MoralisAuth</div>
}

export default MoralisAuth;