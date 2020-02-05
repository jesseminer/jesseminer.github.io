months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

series = ["", "Army of Two", "Assassin's Creed", "Battlefield", "Call of Duty", "Crackdown", "The Elder Scrolls",
          "Fable", "Fallout", "Gears of War", "Halo", "Mass Effect", "Medal of Honor", "BioShock"];

games = [
  g("Halo: Combat Evolved", "11/15/2001", 10),

  g("Fable", "9/14/2004", 7),
  g("Halo 2", "11/9/2004", 10),

  g("Perfect Dark Zero", "11/17/2005", 0),

  g("Ghost Recon Advanced Warfighter", "3/9/2006", 0),
  g("The Elder Scrolls IV: Oblivion", "3/20/2006", 6),
  g("Gears of War", "11/7/2006", 9),

  g("Crackdown", "2/20/2007", 5),
  g("Ghost Recon Advanced Warfighter 2", "3/6/2007", 0),
  g("Forza Motorsport 2", "5/29/2007", 0),
  g("BioShock", "8/21/2007", 13),
  g("Halo 3", "9/25/2007", 10),
  g("The Orange Box", "10/10/2007", 0),
  g("Call of Duty 4: Modern Warfare", "11/5/2007", 4),
  g("Assassin's Creed", "11/15/2007", 2),
  g("Mass Effect", "11/20/2007", 11),

  g("Army of Two", "3/6/2008", 1),
  g("Battlefield: Bad Company", "6/23/2008", 3),
  g("Fable II", "10/21/2008", 7),
  g("Fallout 3", "10/28/2008", 8),
  g("Gears of War 2", "11/7/2008", 9),
  g("CoD: World at War", "11/10/2008", 4),

  g("Halo Wars", "3/3/2009", 10),
  g("Halo 3: ODST", "9/22/2009", 10),
  g("Borderlands", "10/20/2009", 0),
  g("Forza Motorsport 3", "10/27/2009", 0),
  g("CoD: Modern Warfare 2", "11/10/2009", 4),
  g("Assassin's Creed 2", "11/17/2009", 2),

  g("Army of Two: The 40th Day", "1/12/2010", 1),
  g("Mass Effect 2", "1/26/2010", 11),
  g("BioShock 2", "2/9/2010", 13),
  g("Battlefield: Bad Company 2", "3/2/2010", 3),
  g("Red Dead Redemption", "5/18/2010", 0),
  g("Crackdown 2", "7/6/2010", 5),
  g("Halo: Reach", "9/14/2010", 10),
  g("Medal of Honor", "10/12/2010", 12),
  g("Fallout: New Vegas", "10/19/2010", 8),
  g("Fable III", "10/26/2010", 7),
  g("CoD: Black Ops", "11/9/2010", 4),
  g("Assassin's Creed: Brotherhood", "11/16/2010", 2),

  g("Homefront", "3/15/2011", 0),
  g("Crysis 2", "3/22/2011", 0),
  g("Portal 2", "4/19/2011", 0),
  g("Gears of War 3", "9/20/2011", 9),
  g("Forza Motorsport 4", "10/11/2011", 0),
  g("Battlefield 3", "10/25/2011", 3),
  g("CoD: Modern Warfare 3", "11/8/2011", 4),
  g("The Elder Scrolls V: Skyrim", "11/11/2011", 6),
  g("Assassin's Creed: Revelations", "11/15/2011", 2),
  g("Halo: Combat Evolved Anniversary", "11/15/2011", 10),

  g("Mass Effect 3", "3/6/2012", 11),
  g("Borderlands 2", "9/18/2012", 0),
  g("Forza Horizon", "10/23/2012", 0),
  g("Medal of Honor Warfighter", "10/23/2012", 12),
  g("Assassin's Creed III", "10/30/2012", 2),
  g("Halo 4", "11/6/2012", 10),
  g("CoD: Black Ops 2", "11/13/2012", 4),

  g("Crysis 3", "2/19/2013", 0),
  g("Gears of War Judgment", "3/19/2013", 9),
  g("Army of Two: The Devil's Cartel", "3/26/2013", 1),
  g("BioShock Infinite", "3/26/2013", 13),
  g("Grand Theft Auto V", "9/17/2013", 0),
  g("Assassin's Creed IV: Black Flag", "10/29/2013", 2),
  g("Battlefield 4", "10/29/2013", 3),
  g("Call of Duty: Ghosts", "11/5/2013", 4),
  g("Forza Motorsport 5", "11/22/2013", 0),

  g("Thief", "2/25/2014", 0),
  g("Titanfall", "3/11/2014", 0),
  g("Destiny", "9/9/2014", 0),
  g("Forza Horizon 2", "9/30/2014", 0),
  g("Call of Duty: Advanced Warfare", "11/4/2014", 4),
  g("Assassin's Creed Unity", "11/11/2014", 2),
  g("Halo: The Master Chief Collection", "11/11/2014", 10),

  g("Dying Light", "1/27/2015", 0),
  g("Evolve", "2/10/2015", 0),
  g("Battlefield Hardline", "3/17/2015", 3),
  g("Gears of War: Ultimate Edition", "8/25/2015", 9),
  g("Forza Motorsport 6", "9/15/2015", 0),
  g("Assassin's Creed Syndicate", "10/23/2015", 2),
  g("Halo 5: Guardians", "10/27/2015", 10),
  g("Call of Duty: Black Ops 3", "11/6/2015", 4),
  g("Fallout 4", "11/10/2015", 8),

  g("Forza Horizon 3", "9/27/2016", 0),
  g("Gears of War 4", "10/11/2016", 9),
  g("Battlefield 1", "10/21/2016", 3),
  g("Titanfall 2", "10/28/2016", 0),
  g("Call of Duty: Infinite Warfare", "11/4/2016", 4),

  g("Halo Wars 2", "2/21/2017", 10),
  g("Mass Effect: Andromeda", "3/21/2017", 11),
  g("Destiny 2", "9/6/2017", 0),
  g("Forza Motorsport 7", "10/3/2017", 0),
  g("Assassin's Creed Origins", "10/27/2017", 2),
  g("Call of Duty: WWII", "11/3/2017", 4),

  g("Forza Horizon 4", "10/2/2018", 0),
  g("Assassin's Creed Odyssey", "10/5/2018", 2),
  g("Call of Duty: Black Ops 4", "10/12/2018", 4),
  g("Red Dead Redemption 2", "10/26/2018", 0),
  g("Fallout 76", "11/14/2018", 8),
  g("Battlefield V", "11/20/2018", 3),

  g("Apex Legends", "2/4/2019", 0),
  g("Crackdown 3", "2/15/2019", 5),
  g("Gears of War 5", "9/10/2019", 9),
  g("Borderlands 3", "9/13/2019", 0),
  g("Call of Duty: Modern Warfare", "10/25/2019", 4)
];
