// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract frens {
    struct Following {
        address followingAddress;
        string followingName;
    }
    struct myProfile {
        uint256 random;
        address[] followers;
        address[] following;
    }
    mapping(address => myProfile) public addressToProfile;
    Following [] public myFollowing;
    mapping(address => Following[]) public allMyFollowing;

    function getMyFollowing(address userAddress) public view returns(Following[] memory){
        return allMyFollowing[userAddress];
    }
    function follow(address userAddress, string memory name) public{
        addressToProfile[msg.sender].following.push(userAddress);
        allMyFollowing[msg.sender].push(Following(userAddress, name));
        addressToProfile[userAddress].followers.push(msg.sender);
    }
    function getFollowers(address userAddress) public view returns(address[] memory){
        return addressToProfile[userAddress].followers;
    }
}