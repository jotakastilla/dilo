-- Manual rollback for migration 0001. Run only after confirming no production
-- data needs to be retained; this is deliberately not part of the up runner.
DROP TABLE IF EXISTS selection_proposals;
DROP TABLE IF EXISTS gift_drafts;
DROP TABLE IF EXISTS inventory_records;
