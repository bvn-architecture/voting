"""bvn vote simulator"""
import random
import itertools
from collections import Counter
from operator import itemgetter, methodcaller, attrgetter

def main(): 
    """the first function to start, chooses if we're simulating currency or order voting"""
    """we also define global varialbes here as seen in the first three lines"""
    vote_choose_method = "currency" # "ordering"
    number_of_voters = 220
    num_ultimate_candidates = 13
    if vote_choose_method == "currency":
        voting_tokens_available = 15
        vote_currency_voting(number_of_voters, voting_tokens_available, num_ultimate_candidates)
    elif vote_choose_method == "ordering":
        user_defined_cut = 13
        vote_order_voting(number_of_voters, num_ultimate_candidates, user_defined_cut)

def make_blank_candidate_list():
    """creates a default blank candidate list, this list is not auto-generated"""
    candidate_list = {}
    for i in range(1, 63):
        candidate_list["candidate_" + str(i)] = 0 #generates a candidate list
    #print candidateList
    return candidate_list

def vote_currency_voting(num_voters,
                         voting_tokens_available, num_ultimate_candidates):
    """handles the setup of currency voting, it also makes sure that the currency system has tokens to use"""
    all_votes = []
    for i in range(num_voters):
        all_votes.append(Counter(currency_execute(voting_tokens_available)))
        #voteTotalList = makeBlankCandidateList()
    report_results(all_votes, num_ultimate_candidates, True)

def vote_order_voting(num_voters, 
                    num_ultimate_candidates, user_defined_cut):
    """handles the setup of the order voting method"""
    all_votes = []
    for i in range(num_voters):
        all_votes.append(Counter(order_cand_list(make_blank_candidate_list(), user_defined_cut)))
    report_results(all_votes, num_ultimate_candidates, biggest=False)

def report_results(all_votes, 
                   num_ultimate_candidates, biggest=True):
    """prints final results from the ordered method, it also handles the sorting logic"""
    total_vote_count = sum(all_votes, Counter())

    total_vote_count = [(v, k) for k, v in total_vote_count.iteritems()]
    total_vote_count.sort()
    ordered_candidates = total_vote_count
    if biggest == False:
        ordered_candidates = ordered_candidates[::-1] #[::-1] is a slice that reverses the array
    ultimate_candidates = ordered_candidates[:num_ultimate_candidates]
    print "VOTE COUNT: ", total_vote_count
    scores_only = [scorePair[0] for scorePair in total_vote_count]
    names_only = [scorePair[1] for scorePair in total_vote_count]
    print "SCORES ONLY: ", scores_only
    print "NAMES ONLY:  ", names_only[:num_ultimate_candidates]
  

def currency_execute(unused_votes=10):
    """handles all the currency method's logic"""
    vote_giver = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3] #this randomizes the amount of points given to candidates
    ballot_paper = make_blank_candidate_list()
    #print "starting with " +str(unusedVotes)+" unusedVotes"
    while unused_votes != 0:
        this_candidate_id = random.choice(list(ballot_paper.keys())) #this allocates the points randomly with no bias
        amount = vote_giver[random.randint(0, len(vote_giver)-1)]
        if amount - unused_votes > 0:
            ballot_paper[this_candidate_id] = unused_votes
            unused_votes = 0            # print "you've hit zero"
        else:
            ballot_paper[this_candidate_id] += amount
            unused_votes -= amount
    return ballot_paper

def list_average(vote_list): 
    """gets the average value of the order method score list"""
    return sum(vote_list) / float(len(vote_list))

def strip_to_names(dict_of_voting_sheet):
    """strips down the canlist into a dictionary so we can reference it later"""
    candidate_list = dict_of_voting_sheet.keys()
    return candidate_list

def level_off_uncaring_part(final_sort, cut_off_line):
    """cuts off scores from a certain point and averages the ones below that line"""
    #print "ordered numbers ", finalSort, "cutOffLine", cutOffLine
    sorted_bit = final_sort[:cut_off_line]
    cut_off_bit = final_sort[cut_off_line:]
    cut_off_average = list_average(cut_off_bit)
    averaged_list = list(itertools.repeat(cut_off_average, len(cut_off_bit)))

    return sorted_bit + averaged_list


def order_cand_list(blank_ballot_paper,  cut_off_line): 
    """orders the scores triggers the cut off point"""
    candidate_list = strip_to_names(blank_ballot_paper)
    random.shuffle(candidate_list)
    ordered_numbers = range(len(candidate_list))

    ordered_numbers = level_off_uncaring_part(ordered_numbers, cut_off_line)

    scored = dict(zip(candidate_list, ordered_numbers))
    return scored
main()
