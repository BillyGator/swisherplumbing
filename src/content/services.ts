/**
 * Service-page content.
 *
 * Every paragraph below is GENERAL plumbing education written for this site.
 * None of it is a claim about what Swisher Plumbing will do, how quickly it
 * will arrive, what equipment it owns, or what a job will cost. The only
 * business-specific facts are the Phase 0 safe identity facts (name, phone,
 * canonical origin) and the service names already listed on the live site.
 * Do not "enrich" this copy with unverified capabilities — see
 * PHASE_1_CONTENT_BLOCKERS.md and OWNER_FACT_CHECK.md.
 */

export interface ServiceImage {
  /** WebP variant (generated from the source artwork). */
  webp: string;
  /** Safe fallback (resized lossless copy of the source artwork). */
  fallback: string;
  /** Original intrinsic pixel dimensions of the source artwork. */
  width: number;
  height: number;
  /** Accurate alt text describing the brand illustration. */
  alt: string;
}

export interface ServiceContent {
  /** URL slug under /plumbing-services/. */
  slug: string;
  /** Display name used for the H1, titles, and schema. */
  name: string;
  /** One-sentence summary used on the hub page and in cards. */
  summary: string;
  /** Intro paragraphs below the H1. */
  intro: string[];
  /** H2: warning signs. */
  warningSigns: string[];
  /** H2: why professional diagnosis matters. */
  diagnosis: string[];
  /** H2: what the work can involve. */
  workInvolves: string[];
  /** H2: factors that affect the chosen solution. */
  factors: string[];
  /** H2: safety. */
  safetyIntro: string;
  safetyTips: string[];
  /** "When to stop using it" callout lines. */
  stopUsing: string[];
  /** Slugs of related services for contextual internal links. */
  related: string[];
  /** Brand illustration for the page, if one exists. */
  image?: ServiceImage;
}

export const SERVICES: ServiceContent[] = [
  {
    slug: 'leak-detection-repair',
    name: 'Leak Detection & Repair',
    summary:
      'Finding the true source of a leak takes more than guesswork. Learn the warning signs and why hidden leaks deserve a professional look.',
    intro: [
      'A plumbing leak is not always where the water shows up. Water travels along pipes, framing, and slabs before it drips through a ceiling or bubbles up under flooring, so the visible stain is often far from the actual failure. Finding the true source is the first step of any lasting repair.',
      'Some leaks are obvious — a dripping supply line under a sink or a fixture that will not stop running. Others hide inside walls, under slabs, or in crawl spaces and can run for months before anyone notices. Swisher Plumbing, LLC lists leak detection and repair among its services; call (850) 619-8613 to describe what you are seeing.',
    ],
    warningSigns: [
      'Water stains or discoloration on ceilings, walls, or floors',
      'The sound of running or dripping water when every fixture is off',
      'A water meter that keeps moving with all fixtures shut off',
      'Warm spots on the floor, which can indicate a hot-water line leak under a slab',
      'Unexplained increases in your water bill',
      'Musty odors, peeling paint, or warped flooring',
      'Damp or unusually green patches in the yard over buried lines',
    ],
    diagnosis: [
      'Guessing at a hidden leak usually means cutting into walls or concrete in the wrong place. Professional diagnosis narrows the search first: isolating fixtures, testing pressure on different sections of the system, and listening for the sound of water escaping a pressurized line.',
      'This matters because the right fix depends on the right diagnosis. A failed joint, a corroded section of pipe, a pinhole in a supply line, and a slab leak all call for different repairs, and repairing the symptom instead of the source invites the leak back.',
    ],
    workInvolves: [
      'Isolating and pressure-testing sections of the supply system to locate the failure',
      'Repairing or replacing damaged sections of pipe, joints, or fittings',
      'Repairing leaking faucets, valves, and fixture supply connections',
      'Addressing the water damage path and confirming the repair holds',
    ],
    factors: [
      'Where the leak is: exposed pipe under a sink is a very different job from a line inside a slab or wall',
      'The age and material of the plumbing, and whether nearby sections show the same wear',
      'Whether the leak is a one-time failure or part of a broader pattern',
      'How much access exists and how much finished surface would need to be opened',
    ],
    safetyIntro:
      'Water and electricity do not mix, and even a small leak can do serious structural damage over time.',
    safetyTips: [
      'If water is near outlets, appliances, or your electrical panel, keep clear of the area until power to that circuit is off',
      'Do not ignore a leak because it is small — chronic moisture feeds mold and rots framing',
      'Know where your main water shutoff is so you can stop the supply quickly if something bursts',
    ],
    stopUsing: [
      'Stop using any fixture that leaks at its supply connection until it is repaired',
      'If you find a bulge or active spray in a pipe, shut off the main water supply rather than nursing it along',
    ],
    related: ['drain-cleaning', 'fixture-upgrades', 'water-heater-services'],
    image: {
      webp: '/images/Working_under_sink-640.webp',
      fallback: '/images/Working_under_sink-640.png',
      width: 1200,
      height: 1193,
      alt: 'Swisher Plumbing pelican mascot working under a sink',
    },
  },
  {
    slug: 'drain-cleaning',
    name: 'Drain Cleaning',
    summary:
      'Slow or clogged drains have causes a plunger cannot reach. Learn the warning signs of a deeper blockage and why professional cleaning lasts longer.',
    intro: [
      'Every drain in a home leads to a branch line and then to the main sewer line. A clog can sit in any of them, and where it sits changes what it will take to clear it. Grease and food scraps build up in kitchen lines, hair and soap scum in bathroom lines, and roots or scale in the larger buried lines.',
      'Reaching for a bottle of chemical drain cleaner is a common first move, but it rarely removes the whole blockage and it can damage older pipes — and it leaves the cause in place. Mechanical cleaning removes the obstruction itself. Swisher Plumbing, LLC lists drain cleaning among its services; call (850) 619-8613 to talk through what your drains are doing.',
    ],
    warningSigns: [
      'Water draining slowly from sinks, tubs, or showers',
      'Gurgling sounds from drains or toilets, especially after running water elsewhere',
      'Recurring clogs in the same fixture that keep coming back after clearing',
      'Multiple fixtures backing up at once, which points past one branch line',
      'Unpleasant odors rising from drains',
      'Water pooling around floor drains',
    ],
    diagnosis: [
      'A clog that returns quickly was never fully removed. Partial clearing leaves a rough, narrowed pipe that catches the next batch of debris, which is why a drain that was "fixed" last month is slow again.',
      'When several fixtures act up together, the problem is usually deeper in the system than any fixture-level fix can reach. Sorting out which line is actually blocked — before the wrong line is opened up — is where professional diagnosis earns its keep.',
    ],
    workInvolves: [
      'Mechanical clearing of the blockage with professional drain-cleaning equipment',
      'Hydro jetting, which scours grease and scale from the pipe walls rather than just punching a hole through the clog',
      'Camera inspection of the line when blockages keep coming back, to check for roots, damage, or scale',
      'Advice on what should and should not go down the drain to slow future buildup',
    ],
    factors: [
      'Where the blockage sits: a branch line is a smaller job than the main line',
      'What the pipe is made of and how old it is — aggressive methods are not right for fragile lines',
      'Whether roots, a belly in the line, or pipe damage are the real cause',
      'How the kitchen and bathroom are actually used — heavy grease use clogs lines faster',
    ],
    safetyIntro:
      'Chemical drain cleaners are the main hazard homeowners add to a clogged-drain problem.',
    safetyTips: [
      'Never mix drain-cleaning chemicals, and never use them in a completely blocked pipe — the chemical can sit in the line and splash back',
      'Keep hands and tools out of a garbage disposal; switch off power at the breaker before any work near it',
      'If sewage is backing up into the home, treat it as a health hazard and keep children and pets away',
    ],
    stopUsing: [
      'Stop running water into any drain that is backing up — you will only add to what overflows',
      'If sewage is surfacing at a floor drain or toilet, stop using all plumbing until the line is checked',
    ],
    related: ['sewer-line-service', 'leak-detection-repair', 'fixture-upgrades'],
    image: {
      webp: '/images/pelican-drain.webp',
      fallback: '/images/pelican-drain.png',
      width: 309,
      height: 224,
      alt: 'Swisher Plumbing pelican mascot illustration for drain cleaning',
    },
  },
  {
    slug: 'water-heater-services',
    name: 'Water Heater Services',
    summary:
      'No hot water, rusty water, or a noisy tank? Learn what those symptoms can mean and what repair or replacement paths exist.',
    intro: [
      'A water heater works quietly for years, so the first sign of trouble usually comes through the taps: water that runs cold too soon, looks rusty, smells off, or arrives with popping and rumbling sounds from the tank. Each symptom points somewhere different.',
      'Whether a repair makes sense or replacement is the better path depends on the age and condition of the unit and the specific failure. Swisher Plumbing, LLC lists water heater services among its services; call (850) 619-8613 to describe what your heater is doing.',
    ],
    warningSigns: [
      'Hot water that runs out much faster than it used to',
      'Rust-colored or cloudy hot water',
      'Popping, rumbling, or banging sounds from the tank — usually sediment hardening on the bottom',
      'Moisture, drips, or pooling around the base of the heater',
      'A pilot light or burner that will not stay lit, on gas units',
      'Water that is hot one moment and lukewarm the next',
    ],
    diagnosis: [
      'Many hot-water complaints trace back to a small set of parts: heating elements and thermostats on electric units, burner assemblies and thermocouples on gas units, temperature-and-pressure relief valves, and sacrificial anode rods that quietly corrode so the tank does not.',
      'Sediment deserves special mention in Florida, where water is hard. Layers of mineral scale insulate the water from the heat source, make the unit work harder, and eventually shorten its life. Whether flushing helps, or the tank has already paid the price, is a judgment best made by looking at the unit rather than guessing from the symptom.',
    ],
    workInvolves: [
      'Repairing or replacing failed elements, thermostats, valves, and burner components',
      'Flushing sediment from the tank as part of maintenance',
      'Replacing an aging or failed tank-style unit',
      'Installing and servicing tankless (on-demand) water heaters',
      'Regular maintenance that extends the life of the unit',
    ],
    factors: [
      'The age and overall condition of the unit — repairs on a near-end-of-life tank rarely pay off',
      'Household hot-water demand: tank size or tankless capacity has to match it',
      'Fuel type — electric, natural gas, or propane — and what the home already supports',
      'Sediment and water quality, which drive maintenance needs',
      'Space, venting, and code requirements for any replacement',
    ],
    safetyIntro:
      'A water heater combines water, heat, and — on gas models — combustion, so some symptoms are safety issues, not comfort issues.',
    safetyTips: [
      'Never cap or block the temperature-and-pressure relief valve; if it is dripping constantly, the valve or the tank needs attention',
      'If you smell gas near a gas water heater, leave the area and call your gas utility from outside the home',
      'Scalding risk rises with temperature settings — very hot settings are hard on children and the elderly',
    ],
    stopUsing: [
      'If the tank itself is leaking (not just a fitting), stop using hot water and shut off the supply to the unit — tank leaks do not heal',
      'If the relief valve is discharging steadily, turn the unit off until it is inspected',
    ],
    related: ['leak-detection-repair', 'fixture-upgrades', 'drain-cleaning'],
    image: {
      webp: '/images/Water_heater_repair-640.webp',
      fallback: '/images/Water_heater_repair-640.png',
      width: 1131,
      height: 1200,
      alt: 'Swisher Plumbing pelican mascot illustration for water heater repair',
    },
  },
  {
    slug: 'fixture-upgrades',
    name: 'Fixture Upgrades',
    summary:
      'New faucets, toilets, and showerheads can cut water use and refresh a room. Learn what a professional installation involves and when replacement beats repair.',
    intro: [
      'Fixtures are the visible part of the plumbing, and they are also where small problems start: a faucet that drips at the spout, a toilet that runs long after the flush, a showerhead that has slowed to a trickle. Sometimes a worn part fixes it; sometimes the fixture has earned its retirement.',
      'Upgrading is about more than looks. Modern toilets use a fraction of the water older ones do, efficient showerheads cut flow without cutting pressure, and new valves shut off cleanly instead of seizing. Swisher Plumbing, LLC lists fixture upgrades among its services; call (850) 619-8613 to talk through what you have in mind.',
    ],
    warningSigns: [
      'A faucet that drips, spits, or will not fully shut off',
      'A toilet that runs intermittently or takes several minutes to refill',
      'Corrosion, mineral crust, or green-white buildup around connections',
      'Handles that are loose, stiff, or require "the trick" to work',
      'Visible leaks at the base of a faucet or the base of a toilet',
      'Outdated fixtures in a home you are updating or preparing to sell',
    ],
    diagnosis: [
      'The repair-versus-replace question is really a question about what failed. Washers, cartridges, flappers, and fill valves are inexpensive wear parts on otherwise sound fixtures. Pitted valve seats, cracked porcelain, and corroded bodies are not wear parts, and fixing around them is money spent twice.',
      'There is also a hidden compatibility layer: shutoff valves that no longer seal, supply lines past their service life, and drain arms that were adjusted around an old fixture. A professional installation checks the connections the new fixture will depend on, not just the fixture itself.',
    ],
    workInvolves: [
      'Repairing or replacing faucets, including cartridges, valves, and supply connections',
      'Toilet repair and replacement, including fill and flush components',
      'Showerhead and valve upgrades',
      'Replacing worn shutoff valves and supply lines while the fixture is out',
      'Seating and sealing fixtures so they drain and vent correctly',
    ],
    factors: [
      'The condition and age of the existing fixture and the plumbing it connects to',
      'Water efficiency goals — high-efficiency toilets and low-flow showerheads change usage noticeably',
      'Finish, style, and fit, especially in older homes with nonstandard rough-ins',
      'Whether the shutoff valves and supply lines are sound enough to trust behind a new fixture',
    ],
    safetyIntro:
      'Most fixture work is low-risk, but the water supply behind the fixture is live until proven otherwise.',
    safetyTips: [
      'Shut off the supply at the fixture or the main before disassembly, and confirm it is off — old shutoff valves sometimes fail to reseal',
      'Keep track of small parts during disassembly and do not force corroded fittings; they break',
      'A toilet that rocks at the base has a failed seal that is letting sewer gas past — that needs prompt attention',
    ],
    stopUsing: [
      'Stop using a toilet that leaks at its base or rocks — the wax seal is compromised',
      'Stop using any fixture whose supply line is bulging or weeping at the connector',
    ],
    related: ['leak-detection-repair', 'drain-cleaning', 'water-heater-services'],
    image: {
      webp: '/images/Pelican_fixture_upgrade-640.webp',
      fallback: '/images/Pelican_fixture_upgrade-640.png',
      width: 1200,
      height: 1185,
      alt: 'Swisher Plumbing pelican mascot illustration for fixture upgrades',
    },
  },
  {
    slug: 'sewer-line-service',
    name: 'Sewer Line Service',
    summary:
      'Sewer line problems announce themselves early if you know the signs. Learn how video inspection works and what repair or replacement can involve.',
    intro: [
      'Every drain in the house ends at the sewer line, and when that single pipe has trouble, the whole house knows it. Because the line is buried — under the yard, the slab, or both — its problems are invisible until symptoms surface inside the home.',
      'The good news is that modern diagnosis does not require digging first. A camera sent down the line shows exactly where a problem is and what kind it is. Swisher Plumbing, LLC lists sewer line service among its services; call (850) 619-8613 to describe what you are seeing.',
    ],
    warningSigns: [
      'Multiple drains backing up at the same time',
      'Sewage odor inside the home or in the yard',
      'Toilets gurgling when sinks or tubs run',
      'Unusually lush, wet, or sunken patches of yard over the line',
      'Recurring blockages that return even after professional cleaning',
      'Slow drainage house-wide rather than in one fixture',
    ],
    diagnosis: [
      'A video inspection turns a mystery into a map. The camera shows offset joints, root intrusion, scale buildup, bellies (low spots where waste collects), and cracked or collapsed sections — each with its own fix, each located to the foot.',
      'That specificity matters twice: it means repair rather than wholesale replacement when the damage is local, and it means the right section gets opened when replacement genuinely is the answer.',
    ],
    workInvolves: [
      'Camera inspection to locate and identify the failure',
      'Clearing blockages and cutting back root intrusion',
      'Repairing localized damage, such as a cracked section or failed joint',
      'Grinder pump service for homes on low-pressure sewer systems',
      'Full line replacement when the pipe has reached the end of its service life',
    ],
    factors: [
      'The pipe material and age — clay, cast iron, and early plastics all fail differently',
      'Root pressure from mature trees along the line',
      'Whether the damage is localized or spread along the run',
      'Soil conditions and how the line is laid (depth, slope, under-slab versus under-yard)',
      'Whether the home is on a gravity system or relies on a grinder pump',
    ],
    safetyIntro:
      'Sewage is a genuine biohazard, and sewer gas is flammable and dangerous in enclosed spaces.',
    safetyTips: [
      'Keep people and pets away from any sewage backup until it is cleaned up',
      'Do not ignore the smell of sewer gas — it signals a failed trap or seal somewhere',
      'If the backup is severe, avoid using any water in the home until the line is checked',
    ],
    stopUsing: [
      'Stop using all plumbing if sewage is backing up into the home — every flush makes it worse',
      'If a yard area over the line is wet or smells of sewage, keep off it and call',
    ],
    related: ['drain-cleaning', 'grinder-pumps', 'leak-detection-repair'],
    image: {
      webp: '/images/pelican-sewer-640.webp',
      fallback: '/images/pelican-sewer-640.png',
      width: 640,
      height: 646,
      alt: 'Swisher Plumbing pelican mascot illustration for sewer line service',
    },
  },
  {
    slug: 'grinder-pumps',
    name: 'Grinder Pumps',
    summary:
      'Homes below the sewer main rely on a grinder pump. Learn what it does, the warning signs of trouble, and why prompt service matters.',
    intro: [
      'When a home sits lower than the public sewer main, waste cannot flow downhill on its own. A grinder pump sits in a basin below the home, grinds sewage into a fine slurry, and pumps it up to the main. It is out of sight, usually out of mind — until it stops.',
      'A failed grinder pump announces itself quickly and messily, because everything the home sends down the drain arrives in the basin with nowhere to go. Swisher Plumbing, LLC lists grinder pump service among its services; call (850) 619-8613 if yours is acting up.',
    ],
    warningSigns: [
      'An alarm sounding on the pump basin or control panel — treat this as urgent',
      'Toilets, tubs, or sinks draining slowly across the whole house, especially in lower fixtures',
      'Sewage odors near the basin or tank lids',
      'The pump running constantly, cycling rapidly, or not running at all',
      'Wet ground or pooling around the basin lid',
    ],
    diagnosis: [
      'Grinder pump problems fall into a few categories: electrical (float switches, controls, the breaker), mechanical (a jammed impeller or worn grinder), and capacity (a pump that can no longer keep up). The alarm exists to tell you which visit you are in for — its silence after an alarm event does not mean the problem resolved.',
      'Because the pump is both an electrical appliance and part of the sewage path, diagnosis is genuinely two-track: the plumbing side and the control side both have to check out before the system is trustworthy again.',
    ],
    workInvolves: [
      'Servicing or replacing failed pumps, floats, and control components',
      'Clearing jams and checking the grinder mechanism',
      'Inspecting the basin, lids, vents, and discharge line',
      'Routine maintenance to catch wear before the alarm does',
    ],
    factors: [
      'The age and duty cycle of the pump — pumps that cycle often wear faster',
      'What goes down the drains: wipes, grease, and "flushable" products are the classic pump killers',
      'Electrical supply and control-panel condition',
      'The lift height and distance the pump must push, which size the replacement',
    ],
    safetyIntro:
      'A grinder pump basin is an open sewer with electrical equipment beside it — two hazards in one small room.',
    safetyTips: [
      'Never open a basin lid or reach toward the pump — entanglement and exposure are both real risks',
      'Never ignore the alarm, even if it stops on its own',
      'Only flush toilet paper; everything else goes in the trash',
      'Keep the vent clear and the lid seals intact',
    ],
    stopUsing: [
      'If the pump alarm sounds, stop using water in the home — the basin has limited storage and an overflow is the next step',
      'If sewage surfaces around the basin lid, stop using all plumbing immediately',
    ],
    related: ['sewer-line-service', 'drain-cleaning'],
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Absolute canonical URL of a service page. */
export function serviceUrl(slug: string): string {
  return `/plumbing-services/${slug}/`;
}
