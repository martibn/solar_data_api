CREATE TABLE solar_data (
	"timestamp" timestamp NOT NULL,
	power_generated decimal,
	grid_injection decimal,
	grid_consumption decimal,
	power_consumption decimal,
	CONSTRAINT power_pk PRIMARY KEY ("timestamp")
);

create view solar_data_day_summary as 
select date_trunc('day', timestamp) as "timestamp", sum(power_generated)/12 "power_generated", sum(grid_injection)/12 as "grid_injection", sum(grid_consumption)/12 as "grid_consumption", sum(power_consumption)/12 as "power_consumption" 
from solar_data sd 
GROUP BY date_trunc('day', timestamp);

create view solar_data_month_summary as 
select date_trunc('month', timestamp) as "timestamp", sum(power_generated)/12 "power_generated", sum(grid_injection)/12 as "grid_injection", sum(grid_consumption)/12 as "grid_consumption", sum(power_consumption)/12 as "power_consumption" 
from solar_data sd 
GROUP BY date_trunc('month', timestamp);


create view solar_data_year_summary as 
select date_trunc('year', timestamp) as "timestamp", sum(power_generated)/12 "power_generated", sum(grid_injection)/12 as "grid_injection", sum(grid_consumption)/12 as "grid_consumption", sum(power_consumption)/12 as "power_consumption" 
from solar_data sd 
GROUP BY date_trunc('year', timestamp);