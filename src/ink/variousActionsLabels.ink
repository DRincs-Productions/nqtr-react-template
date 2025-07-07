VAR _input_value_ = ""

=== TalkSleepLabel ===
# lazyload bundle alice_roomsleep0A

# show image alice_roomsleep0A
alice: zZz zZz ...

+ Try waking up
	alice: [mc]!!!! What are you doing?!!
	alice: Get out of here! Now!
+ Leave her alone
	-> DONE

=== OrderProductLabel ===
mc: OK! Let's see, let's look for a book....
# remove activity order_product room mc_room
# complete queststage aliceQuest
mc: Here's R****, for $1. Just the thing for me.
