#--Load extra library:
## if not already installed, then run:
# install.packages("ggplot2")
require(ggplot2)
library(reshape2)

#--Define data file directory:
dir <- "/home/ben/projects/voting"

#--Read in table of data
votes <- read.table(paste(dir, "voting.csv", sep="/"), header=TRUE)

plot(votes)
