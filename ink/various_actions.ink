=== order_product ===
mc: OK! Let's see, let's look for a book....
mc: Here's R****, for $1. Just the thing for me.
# remove activity order_product from mc_room
# continue quest aliceQuest
-> DONE

=== talk_alice_sleep ===
# lazyload bundle alice_roomsleep0A

# show image background alice_roomsleep0A
alice: zZz zZz ...

+ Try waking up
	alice: [mc]!!!! What are you doing?!!
	alice: Get out of here! Now!
	-> DONE
+ Leave her alone
	-> DONE

=== talk_alice ===
# show image background alice_terrace0At
{ aliceQuest_currentStageIndex:
- 0: 	-> talk_alice0
- 1: 	-> talk_alice1
- 2: 	-> talk_alice2
- else: alice: Thanks for the book.
}
-> DONE

= talk_alice0
alice: Hi, can you order me a new book from pc?
mc: Ok
alice: Thanks
# continue quest aliceQuest
-> DONE

= talk_alice1
mc: What book do you want me to order?
alice: For me it is the same.
-> DONE

= talk_alice2
mc: I ordered the Book, hope you enjoy it.
alice: Great, when it arrives remember to bring it to me.
-> DONE

= talk_alice3
mc: Here's your book.
alice: Thank you, I can finally read something new.
# continue quest aliceQuest
-> DONE

=== alice_talk_menu ===
# show image background alice_terrace0At
alice: Hi, what do you want to talk about?<> # continue
+ {aliceQuest_started} [About the book]
	-> talk_alice
+ [Cancel]
	-> DONE

=== take_product ===
# remove image background
mc: Wow, a huge package for just one book...
# remove activity take_product from terrace
# continue quest aliceQuest
-> DONE
