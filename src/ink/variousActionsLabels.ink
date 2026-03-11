VAR _input_value_ = ""

=== TalkSleepLabel ===
# lazyload bundle alice_roomsleep0A

# show image background alice_roomsleep0A
alice: zZz zZz ...

+ Try waking up
	alice: [mc]!!!! What are you doing?!!
	alice: Get out of here! Now!
	-> DONE
+ Leave her alone
	-> DONE

=== OrderProductLabel ===
mc: OK! Let's see, let's look for a book....
mc: Here's R****, for $1. Just the thing for me.
# remove activity order_product from mc_room
# continue quest aliceQuest
-> DONE

=== TakeKeyLabel ===
mc: Are these the car keys?! Well... I should try to access the car!
# remove activity take_product from terrace
# continue quest aliceQuest
-> DONE

=== talkAliceQuest ===
# show image background alice_terrace0At
{ aliceQuest_currentStageIndex:
- 0: 	-> talkAliceQuest0
- 1: 	-> talkAliceQuest1
- 2: 	-> talkAliceQuest2
- else: alice: Thanks for the book.
}
iuhi
-> DONE

= talkAliceQuest0
alice: Hi, can you order me a new book from pc?
mc: Ok
alice: Thanks
# continue quest aliceQuest
-> DONE

= talkAliceQuest1
mc: What book do you want me to order?
alice: For me it is the same.
-> DONE

= talkAliceQuest2
mc: I ordered the Book, hope you enjoy it.
alice: Great, when it arrives remember to bring it to me.
-> DONE

= talkAliceQuest3
mc: Here's your book.
alice: Thank you, I can finally read something new.
# continue quest aliceQuest
-> DONE

=== AliceTalkMenuLabel ===
# show image background alice_terrace0At
alice: Hi, what do you want to talk about?
+ {aliceQuest_started} About the book
	-> talkAliceQuest
+ Cancel
	-> DONE
