const { postsInfo } = require('./Post');
const FriendRequest = require('./FriendRequest');
const Membership = require('./Membership');

module.exports = {
    getContextFeed,
    getGlobalProfileFeed,
    getGlobalFeed,
    getGroupFeed
};

// posts from a particular group (visible only to members & the group itself)
// OR posts from a particular member (visible only on their page)
function getContextFeed(context_id) {
    return postsInfo()
    .where('Post.context_id', context_id)
    .orderBy('Post.created_at', 'desc');
}

// feed from a user's page
// if viewer is a friend, they can see the private posts
// otherwise, they see only posts with null context
function getGlobalProfileFeed(creator_id) {
    return postsInfo()
    .where('Post.creator_id', creator_id)
    .andWhere('Post.context_id', null)
    .orderBy('Post.created_at', 'desc');
}

// get the global feed to show a user
// Must show posts from friends and groups
function getGlobalFeed(user_id) {

    return FriendRequest.getOfRequested(user_id)
    .where('is_accepted', true)
    .then(friendsOfRequested =>
        FriendRequest.getOfRequester(user_id)
        .where('is_accepted', true)
        .then(friendsOfRequester => 
            Membership.getUserMembershipGroups(user_id) 
            .then(groups => 
                postsInfo()
                .whereIn('Post.creator_id', [
                    ...friendsOfRequested.map(x => x.requester_id),
                    ...friendsOfRequester.map(x => x.requested_id),
                    ...groups.map(x => x.id),
                    user_id
                ])
                .orderBy('Post.created_at', 'desc')
            )
        )
    );
}

function getGroupFeed(group_id) {
    return postsInfo()
    .where('Post.context_id', group_id)
    .orderBy('Post.created_at', 'desc');
}